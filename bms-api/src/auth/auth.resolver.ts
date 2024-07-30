import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserInput } from '../user/dto/create-user.input';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { User } from '../user/schema/user.schema';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => LoginResponse)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.signIn(
      loginUserInput.email,
      loginUserInput.password,
    );
  }

  @Mutation(() => User)
  async register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }
}
