import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from 'src/controllers/Todo.controller';
import { Todo } from 'src/entities/Todo.entity';
import { TodoService } from 'src/providers/Todo.service';
import { devConfig } from './config/database.config';
import { User } from './entities/User.entity';
import { UserService } from './providers/User.service';
import { UserController } from './controllers/User.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot(devConfig),
    TypeOrmModule.forFeature([Todo, User]),
  ],
  controllers: [AppController, TodoController, UserController],
  providers: [AppService, TodoService, UserService],
})
export class AppModule {}
