import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'blocked';
export type TaskPriority = 1 | 2 | 3 | 4;

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  notes: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl = `${environment.apiBaseUrl}/api/tasks`;

  newTaskTitle: string = '';
  taskStatus: TaskStatus = 'todo';
  taskPriority: TaskPriority = 2;
  taskNotes: string = '';
  taskDuration: number = 1;
  activeTaskId: number | null = null;
  remainingSeconds: number = 0;
  isRunning: boolean = false; 
  private timerId: ReturnType<typeof setInterval> | null = null;

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask = { title: this.newTaskTitle, status: this.taskStatus, priority: this.taskPriority, notes: this.taskNotes, duration: this.taskDuration };
      this.http.post<Task>(this.apiUrl, newTask).subscribe(task => {
        this.tasks.push(task);
        this.newTaskTitle = '';
        this.taskNotes = '';
      });
    }
  }

  deleteTask(taskId: number) {
    this.http.delete(`${this.apiUrl}/${taskId}`).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }

  updateTask(taskId: number) {
    const taskToUpdate = this.tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      this.http.put(`${this.apiUrl}/${taskId}`, taskToUpdate).subscribe(() => {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) this.tasks[index] = { ...taskToUpdate };
      });
    }
  }

  startFocusTimer(taskId: number): void {
  if (this.isRunning && this.activeTaskId === taskId) return;

  this.clearTimer();
  this.activeTaskId = taskId;

  const task = this.tasks.find(t => t.id === taskId);
  if (!task) return;

  this.remainingSeconds = task.duration * 60;
  this.isRunning = true;

  this.timerId = setInterval(() => {
    if (this.remainingSeconds > 0) {
      this.remainingSeconds--;
      return;
    }

    this.pauseFocusTimer();
  }, 1000);
}

pauseFocusTimer(): void {
  this.clearTimer();
  this.isRunning = false;
}

resetFocusTimer(taskId: number): void {
  this.pauseFocusTimer();

  const task = this.tasks.find(t => t.id === taskId);
  if (!task) return;

  this.activeTaskId = taskId;
  this.remainingSeconds = task.duration * 60;
}

get formattedRemainingTime(): string {
  const minutes = Math.floor(this.remainingSeconds / 60);
  const seconds = this.remainingSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

private clearTimer(): void {
  if (!this.timerId) return;
  clearInterval(this.timerId);
  this.timerId = null;
}

  loadTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe(data => {
      this.tasks = data;
    });
  }

  tasks: Task[] = [];

  constructor(private http: HttpClient) { }
}
