import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TaskService } from './task/task.service';
import { TaskController } from './task/task.controller';

@Module({
    imports: [AppRoutingModule, ConfigurationModule, DatabaseModule],
    controllers: [UserController, TaskController],
    providers: [UserService, TaskService],
})
export class AppModule {}
