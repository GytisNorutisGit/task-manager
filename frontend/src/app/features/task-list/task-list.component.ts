import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/task.service';
import { TaskStatus } from '../../core/task.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, NgClass, MatButtonModule, MatInputModule, MatSelectModule, MatCardModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  get newTaskTitle() {
    return this.taskService.newTaskTitle;
  }

  set newTaskTitle(value: string) {
    this.taskService.newTaskTitle = value;
  }

  get taskStatus() {
    return this.taskService.taskStatus;
  }

  set taskStatus(value: TaskStatus) {
    this.taskService.taskStatus = value;
  }
  get tasks() {
    return this.taskService.tasks;
  }

  addTask() { this.taskService.addTask(); }

  deleteTask(taskId: number) { this.taskService.deleteTask(taskId); }

  updateTask(taskId: number) { this.taskService.updateTask(taskId); }

  ngOnInit() {
    // runs once when the component loads
    this.taskService.loadTasks();
  }

  constructor(private taskService: TaskService) { }
}
