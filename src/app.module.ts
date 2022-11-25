import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context : ({req}) => ({headers : req.headers}),
      introspection: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri : process.env.DB_URL,
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASS,
      database: 'todo-test',
      autoLoadModels : true,
      synchronize : true,
      sync : {alter : true}
    }),
    TodoModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
