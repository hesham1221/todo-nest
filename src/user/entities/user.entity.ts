import { ObjectType, Field, Int} from '@nestjs/graphql';

import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table, Unique  } from 'sequelize-typescript';
import { Todo } from 'src/todo/entities/todo.entity';


@ObjectType()
@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => Int)
  id:number

  @Unique
  @Column({
    set(val: string) {
      val && typeof val === 'string'
        ? (this as any).setDataValue('email', val.toLowerCase())
        : (this as any).setDataValue('email', val);
    }
  })
  @Field()
  email :string

  @Column
  password : string

  @HasMany(() => Todo , { onDelete: 'cascade'})
  @Field(() => [Todo],{nullable : true}) 
  todos? : Todo[]

}



