import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { todoMessage } from './dto/removeTodo.output';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel : typeof Todo){}
  create(createTodoInput: CreateTodoInput , context) {
    return this.todoModel.create({...createTodoInput , userId : context.user.id})
  }

  findAll(context) {
    return this.todoModel.findAll({where : {userId : context.user.id} , include : [User]});
  }

  async findOne(id: number) {
    const todo = await this.todoModel.findOne({where : {id },include:[User]});
    if(!todo) throw new NotFoundException
    return todo
  }

  async update(id: number,context, updateTodoInput: UpdateTodoInput) {
    const todo = await this.todoModel.findOne({where : {id, userId : context.user.id },include:[User]});
    if(!todo) throw new NotFoundException
    const {content} = updateTodoInput
    return this.todoModel.update({content},{where : {id}});
  }

  async remove(id: number , context):Promise<todoMessage> {
    const todo = await this.todoModel.findOne({where : {id , userId : context.user.id},include:[User]});
    if(!todo) throw new NotFoundException
     await this.todoModel.destroy({where : {id}});
     return {
        message : `Todo ${id} removed successfully`,
        code : 200
     }
  }

  async setCompleted(context ,id:number){
    const todo = await this.todoModel.findOne({where : {id , userId : context.user.id},include:[User]});
    if(!todo) throw new NotFoundException
    await this.todoModel.update({isCompleted : true},{where : {id}})
    return todo
  }
}
