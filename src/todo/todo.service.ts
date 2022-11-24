import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel : typeof Todo){}
  create(createTodoInput: CreateTodoInput , context) {
    return this.todoModel.create({...createTodoInput , userId : context.user.id})
  }

  findAll(context) {
    return this.todoModel.findAll({where : {userId : context.user.id}});
  }

  findOne(id: number) {
    return this.todoModel.findOne({where : {id }});
  }

  update(id: number, updateTodoInput: UpdateTodoInput) {
    const {content} = updateTodoInput
    return this.todoModel.update({content},{where : {id}});
  }

  remove(id: number) {
    return this.todoModel.destroy({where : {id}});
  }
}
