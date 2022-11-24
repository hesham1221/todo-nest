import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { Todo } from './entities/todo.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [TodoResolver, TodoService],
  imports:[SequelizeModule.forFeature([Todo])]
})
export class TodoModule {}
