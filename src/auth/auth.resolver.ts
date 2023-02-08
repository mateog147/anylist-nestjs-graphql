import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, SingupInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'singup' })
  singup(@Args('singupInput') singupInput: SingupInput): Promise<AuthResponse> {
    return this.authService.singup(singupInput);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }
  /*
  @Query('??', { name: "revalidate" })
  revalidateToken(){
    return this.authService.revalidateToken();
  }*/
}
