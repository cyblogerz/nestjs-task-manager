import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    // getter
    return this.tasks;
  }

  getTaskByid(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskbyId(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskByid(id);
    task.status = status;
    return task;
  }

  createTask(_createTaskDto: CreateTaskDto): Task {
    const { title, description } = _createTaskDto;
    const task: Task = {
      id: randomUUID(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
