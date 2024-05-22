import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('/task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get('/user/:userId')
    @HttpCode(200)
    async getUser(@Param('userId') userId: string): Promise<Task[]> {
        try {
            const tasks = await this.taskService.getUserTasks(userId);
            return tasks;
        } catch (error) {
            throw new HttpException('bad requests', HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async createTask(
        @Body('name') name: string,
        @Body('userId') userId: string,
        @Body('priority') priority: number | string,
    ): Promise<{ task: Task }> {
        try {
            let parsedPriority: number = 0;
            if (typeof priority === 'string') {
                parsedPriority = parseInt(priority, 10);
            }
            const task = await this.taskService.addTask(
                name,
                userId,
                parsedPriority,
            );
            return { task };
        } catch (error) {
            throw new HttpException('bad requests', HttpStatus.BAD_REQUEST);
        }
    }
}
