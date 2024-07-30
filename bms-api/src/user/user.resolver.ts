import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './schema/user.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  async findOneUser(@Args('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => String)
  async removeUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<string> {
    await this.userService.remove(id);
    return 'User deleted successfully';
  }
}
