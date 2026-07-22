import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'blocked';

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  newTaskTitle: string = '';
  taskStatus: TaskStatus = 'todo';

addTask() {
  if (this.newTaskTitle.trim()) {
    const newTask = { title: this.newTaskTitle, status: this.taskStatus };
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

  loadTasks() {
    this.http.get<Task[]>('http://localhost:5204/api/tasks').subscribe(data => {
      this.tasks = data;
    });
  }

  tasks: Task[] = [];

  constructor(private http: HttpClient) { }
}
