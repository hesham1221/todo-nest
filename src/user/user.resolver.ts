import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { LoginInput } from './dto/login.input';
import { AuthMessage } from './dto/signIn.output';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => AuthMessage)
  login(@Args('input') input : LoginInput){
    return this.userService.login(input)
  }

  @Mutation(() => AuthMessage)
  signUp(@Args('input') input: LoginInput) {
    return this.userService.signup(input);
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }
}
