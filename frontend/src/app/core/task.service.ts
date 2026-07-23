import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'blocked';
export type TaskPriority = 1 | 2 | 3 | 4;

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  newTaskTitle: string = '';
  taskStatus: TaskStatus = 'todo';
  taskPriority: TaskPriority = 2;
  taskNotes: string = '';

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask = { title: this.newTaskTitle, status: this.taskStatus, priority: this.taskPriority, notes: this.taskNotes };
      this.http.post<Task>('http://localhost:5204/api/tasks', newTask).subscribe(task => {
        this.tasks.push(task);
        this.newTaskTitle = '';
      });
    }
  }

  deleteTask(taskId: number) {
    this.http.delete(`http://localhost:5204/api/tasks/${taskId}`).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }

  updateTask(taskId: number) {
    const taskToUpdate = this.tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      this.http.put(`http://localhost:5204/api/tasks/${taskId}`, taskToUpdate).subscribe(() => {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) this.tasks[index] = { ...taskToUpdate };
      });
    }
  }

  loadTasks() {
    this.http.get<Task[]>('http://localhost:5204/api/tasks').subscribe(data => {
      this.tasks = data;
    });
  }

  tasks: Task[] = [];

  constructor(private http: HttpClient) { }
}
