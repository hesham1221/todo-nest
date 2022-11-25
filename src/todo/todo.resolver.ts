import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/jwt.auth.guard';
import { todoMessage } from './dto/removeTodo.output';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(new AuthGuard())
  @Mutation(() => Todo)
  createTodo(@Context() context , @Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput , context);
  }

  @UseGuards(new AuthGuard())
  @Query(() => [Todo], { name: 'todo' })
  findAll(@Context()context) {
    return this.todoService.findAll(context);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => Todo)
  updateTodo(@Context()context ,@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(context,updateTodoInput.id, updateTodoInput);
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => Todo)
  setCompleted(@Context()context , @Args('id')id : number){
    return this.todoService.setCompleted(context,id)
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => todoMessage)
  removeTodo(@Context()context ,@Args('id', { type: () => Int }) id: number) {
    return this.todoService.remove(id , context);
  }
}


