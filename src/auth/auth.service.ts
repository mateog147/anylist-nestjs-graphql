import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './dto/inputs';
import { SingupInput } from './dto/inputs/singup.input';
import { AuthResponse } from './types/auth-response.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async singup(singupInput: SingupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(singupInput);
    //ToDo crear JWT
    const token = 'abc1234';

    return { token, user };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(loginInput.email);
    if (!bcrypt.compareSync(loginInput.password, user.password)) {
      throw new HttpException('credentials error', HttpStatus.BAD_REQUEST);
    }
    const token = 'abc1234';

    return { token, user };
  }
}
