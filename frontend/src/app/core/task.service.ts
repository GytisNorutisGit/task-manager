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
      this.tasks.push({ id: this.tasks.length + 1, title: this.newTaskTitle, status: this.taskStatus });
      this.newTaskTitle = '';
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  tasks: Task[] = [
    { id: 1, title: 'Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', status: 'todo' },
    { id: 3, title: 'Task 3', status: 'todo' },
  ]

  constructor() { }
}
