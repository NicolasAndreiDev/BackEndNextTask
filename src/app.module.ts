import { Module } from '@nestjs/common';
import { UserService } from './user/service/user.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/dtos/schema/user.schema';
import { ConfigModule } from '@nestjs/config';
import { UserResolver } from './user/resolvers/user.resolver';
import { ProjectResolver } from './project/resolvers/project.resolver';
import { ProjectService } from './project/service/project.service';
import { CardService } from './card/service/card.service';
import { CardResolver } from './card/resolvers/card.resolver';
import { TaskResolver } from './task/resolvers/task.resolver';
import { TaskService } from './task/service/task.service';
import { GetInfo } from './utils/common.utils';
import { InvitationSchema } from './invitations/dtos/schema/invitation.schema';
import { InvitationService } from './invitations/service/invitation.service';
import { InvitationResolver } from './invitations/resolvers/invitation.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: { path: 'src/schema.gql' },
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECT),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Invitation', schema: InvitationSchema },
    ]),
  ],
  controllers: [],
  providers: [
    UserResolver,
    ProjectResolver,
    CardResolver,
    TaskResolver,
    InvitationResolver,
    UserService,
    ProjectService,
    CardService,
    TaskService,
    InvitationService,
    GetInfo,
  ],
})
export class AppModule {}
