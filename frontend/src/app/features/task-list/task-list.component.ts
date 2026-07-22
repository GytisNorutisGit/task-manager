import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/task.service';
import { TaskStatus } from '../../core/task.service';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, NgClass],
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

  addTask() {this.taskService.addTask();}

  deleteTask(taskId: number) {this.taskService.deleteTask(taskId);}

  constructor(private taskService: TaskService) {}
}
