import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserService {
    private prisma;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async addUser(email: string): Promise<User> {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: email },
        });

        if (!email || !this.isValidEmail(email)) {
            throw new Error('Invalid user data');
        } else if (existingUser) {
            const error = new Error('User already exists');
            error.name = 'ConflictError';
            throw error;
        }
        if (email) {
            return this.prisma.user.create({
                data: {
                    email: email,
                },
            });
        }
    }
    async getUser(email: string): Promise<User> {
        return await this.prisma.user.findUnique({ where: { email } });
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

    isValidEmail(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email);
    }
}
