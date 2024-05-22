import { Injectable } from '@nestjs/common';
import { PrismaClient, Task } from '@prisma/client';

@Injectable()
export class TaskService {
    private prisma;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async addTask(
        name: string,
        userId: string,
        priority: number,
    ): Promise<Task> {
        if (!name || !userId || !this.isValidPriority(priority)) {
            throw new Error('Invalid task data');
        }

        return this.prisma.task.create({
            data: {
                name,
                userId,
                priority,
            },
        });
    }

    async getTaskByName(name: string): Promise<Task> {
        const task = await this.prisma.task.findFirst({
            where: { name },
        });
        if (!task) {
            throw new Error(`Task with name ${name} not found`);
        }
        return task;
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        const existingUser = await this.prisma.task.findMany({
            where: { userId },
        });
        if (existingUser.length > 0) {
            return existingUser;
        } else {
            throw new Error('Invalid user data');
        }
    }

    async resetData(): Promise<void> {
        try {
            await this.prisma.task.deleteMany({});
            await this.prisma.user.deleteMany({});
            return;
        } catch (error) {
            console.error('Error resetting data:', error);
            throw new Error('Failed to reset data');
        }
    }

    private isValidPriority(priority: any): boolean {
        return typeof priority === 'number' && priority > 0;
    }
}
