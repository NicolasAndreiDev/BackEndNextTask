import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { User } from '../dtos/schema/user.schema';
import { AutenticacaoUser } from '../dtos/inputs/autenticacao';
import { UpdateUserInput } from '../dtos/inputs/update-user';
import { CreateUserNextInput } from '../dtos/inputs/createUserNext';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('data') user: AutenticacaoUser) {
    return this.userService.create(user);
  }

  @Mutation(() => User)
  async createUserNext(@Args('user') user: CreateUserNextInput) {
    return this.userService.createUserNext(user);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') user: UpdateUserInput,
  ) {
    return this.userService.update(id, user);
  }

  @Mutation(() => User)
  async deleteUser(@Args('data') id: string) {
    return this.userService.delete(id);
  }

  @Mutation(() => User)
  async userLogin(@Args('data') user: AutenticacaoUser) {
    return this.userService.logar(user);
  }

  @Query(() => User, { nullable: true })
  async getUserByEmail(@Args('data') email: string) {
    return this.userService.findByEmail(email);
  }

  @Query(() => [User])
  async getUsersByEmail(
    @Args('users', { type: () => [String] }) users: string[],
  ) {
    return this.userService.findAllUsers(users);
  }

  @Query(() => User)
  async getUserById(@Args('userId') userId: string) {
    return this.userService.findById(userId);
  }
}
