import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://taskmanager-backend-y1kn.onrender.com/api/tasks'; // Fixed URL

  async getTasks() {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async addTask(task: any) {
    const response = await axios.post(this.apiUrl, task);
    return response.data;
  }

  async updateTask(id: number, task: any) {
    const response = await axios.put(`${this.apiUrl}/${id}`, task);
    return response.data;
  }

  async deleteTask(id: number) {
    await axios.delete(`${this.apiUrl}/${id}`);
  }
}
