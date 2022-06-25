import { Controller, Post, Body, Logger, Get, Put, Delete, Query } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('api/task')
export class TaskController {
    constructor(
        private taskService: TaskService
    ) {}

    private logger = new Logger('TasksController');

    @Post()
    public createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        const { text } = createTaskDto;
        this.logger.verbose(`Creating task: ${text}`);
        return this.taskService.createTask(createTaskDto);
    }

    @Get()
    public getAllTasks(): Promise<Task[]> {
        this.logger.verbose("Retrieving all tasks");
        return this.taskService.getAllTasks();
    }

    @Put()
    public updateReminder(@Body('reminder') reminder: boolean, @Body('id') id: string): Promise<Task> {
        this.logger.verbose(`Updating task ${id} reminder to ${reminder}.`);
        return this.taskService.updateReminder(reminder, id)
    }

    @Delete()
    public deleteTask(@Query('id') id: string): void {
        this.taskService.deleteTask(id);
    }
}
