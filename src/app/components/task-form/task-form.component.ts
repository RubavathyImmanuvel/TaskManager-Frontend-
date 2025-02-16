import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  imports: [FormsModule]
})
export class TaskFormComponent implements OnChanges {
  @Input() task: any = { title: '', description: '', dueDate: '', priority: 'MEDIUM', status: 'PENDING' };
  @Output() taskSaved = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  ngOnChanges() {
    // When a new task is selected for editing, update the form
    this.task = this.task?.id ? { ...this.task } : { title: '', description: '', dueDate: '', priority: 'MEDIUM', status: 'PENDING' };
  }

  async saveTask() {
    if (this.task.id) {
      await this.taskService.updateTask(this.task.id, this.task);
    } else {
      await this.taskService.addTask(this.task);
    }
    this.taskSaved.emit();
  }
}
