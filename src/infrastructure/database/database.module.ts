import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Module({
    imports: [PrismaClient],
})
export class DatabaseModule {}
