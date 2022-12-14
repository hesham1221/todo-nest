import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { LoginInput } from './dto/login.input';
import { Todo } from 'src/todo/entities/todo.entity';

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private UserModel: typeof User){}

  userWithToken(user : User){
    return {
            token: jwt.sign(
              { email: user.email, id: user.id },
              process.env.SECRET,
            ),
            user : user,
          };
  }

 async signup(createUserInput: LoginInput) {
  const { email, password } = createUserInput;
    const newPassword: string = await bcrypt.hash(password, 10);
    const user = await this.UserModel.create({email , password : newPassword});
    return this.userWithToken(user)
  }

 async login(input : LoginInput){
    const { email, password } = input;
    try {
      const user = await this.UserModel.findOne({ where: { email } ,include : [Todo]});
      if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          return this.userWithToken(user)
        } else {
          throw UnauthorizedException;
        }
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new NotFoundException('user not found');
    }
  }

  findAll() {
    return this.UserModel.findAll({include : [Todo]});
  }

  findOne(id: number) {
    return this.UserModel.findOne({where : {id} , include:[Todo]});
  }
}
