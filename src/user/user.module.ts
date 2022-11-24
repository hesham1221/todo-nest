import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Module({
  providers: [UserResolver, UserService],
  imports:[SequelizeModule.forFeature([User])]
})
export class UserModule {}
