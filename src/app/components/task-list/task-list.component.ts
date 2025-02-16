import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, TaskFormComponent]
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  selectedTask: any = null; // Holds the task being edited

  constructor(private taskService: TaskService) {}

  async ngOnInit() {
    this.tasks = await this.taskService.getTasks();
  }

  editTask(task: any) {
    this.selectedTask = { ...task }; // Copy task to avoid direct modification
  }

  async deleteTask(id: number) {
    await this.taskService.deleteTask(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  onTaskSaved() {
    this.selectedTask = null; // Reset the form after saving
    this.ngOnInit(); // Refresh task list
  }
}
