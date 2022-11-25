import { ObjectType, Field, Int} from '@nestjs/graphql';

import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, Unique, UpdatedAt  } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';


@ObjectType()
@Table
export class Todo extends Model<Todo> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => Int)
  id:number

  @Column
  @Field()
  content :string

  @Default(false)
  @Column
  @Field(() => Boolean)
  isCompleted : boolean

  @CreatedAt
  @Column({ type: DataType.DATE })
  @Field(() => Date)
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  @Field(()=> Date)
  updatedAt: Date;


  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  @Field(() => User)
  user : User

}



