import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.entity';
import { v4 as uuid } from 'uuid';


@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>
    ) {}

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { text, day, reminder } = createTaskDto;
        const newTask = this.taskRepository.create({
            id: uuid(),
            text,
            day,
            reminder
        });
        return this.taskRepository.save(newTask);
    }

    async getAllTasks(): Promise<Task[]> {
        return this.taskRepository.find()
    }

    async updateReminder(reminder: boolean, id: string): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id }})
        task.reminder = reminder;
        return this.taskRepository.save(task);
    }

    async deleteTask(id: string): Promise<void> {
        const resp = await this.taskRepository.delete({ id: id })
        console.log(resp)
        if (!resp.affected) throw new NotFoundException();
    }
}
