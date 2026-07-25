import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/task.service';
import { TaskStatus } from '../../core/task.service';
import { TaskPriority } from '../../core/task.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { NgModel } from '@angular/forms';



@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, NgClass, MatButtonModule, MatInputModule, MatSelectModule, MatCardModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  editingTaskIds = new Set<number>();

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

  get taskPriority() {
    return this.taskService.taskPriority;
  }

  set taskPriority(value: TaskPriority) {
    this.taskService.taskPriority = value;
  }

  get taskNotes() {
    return this.taskService.taskNotes;
  }

  set taskNotes(value: string) {
    this.taskService.taskNotes = value;
  }

  get taskDuration() {
    return this.taskService.taskDuration;
  }

  set taskDuration(value: number) {
    this.taskService.taskDuration = value;
  }

  get tasks() {
    return this.taskService.tasks;
  }

  get taskRemainingSeconds() {
    return this.taskService.remainingSeconds;
  }

  get activeTaskId() {
    return this.taskService.activeTaskId;
  }


  addTask(titleModel: NgModel) {
    this.taskService.addTask();
    titleModel.reset('');
  }

  deleteTask(taskId: number) { this.taskService.deleteTask(taskId); }

  updateTask(taskId: number) { this.taskService.updateTask(taskId); }

  toggleEdit(taskId: number) {
    if (this.editingTaskIds.has(taskId)) {
      this.editingTaskIds.delete(taskId);
    } else {
      this.editingTaskIds.add(taskId);
    }
  };

  isEditing(taskId: number) {
    return this.editingTaskIds.has(taskId);
  }

  saveTask(taskId: number) {
    this.taskService.updateTask(taskId);
    this.editingTaskIds.delete(taskId);
  }

  startTimer(taskId: number) {
    this.taskService.startFocusTimer(taskId);
  }

  pauseTimer() {
    this.taskService.pauseFocusTimer();
  }

  resetTimer(taskId: number) {
    this.taskService.resetFocusTimer(taskId);
  }

  formattedTime(taskId: number) {
    if (taskId === this.activeTaskId) {
      return this.taskService.formattedRemainingTime;
    }

    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return '0:00';

    return `${task.duration}:00`;

  }


  ngOnInit() {
    // runs once when the component loads
    this.taskService.loadTasks();
  }

  constructor(private taskService: TaskService) { }
}
