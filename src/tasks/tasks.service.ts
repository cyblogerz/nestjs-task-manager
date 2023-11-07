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

  deleteTaskbyId(id: string) {
    this.tasks = this.tasks.filter((task) => task.id != id);
    return this.tasks;
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
