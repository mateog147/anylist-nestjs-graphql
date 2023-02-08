import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SingupInput } from '../auth/dto/inputs/singup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger('UsersService');
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(input: SingupInput): Promise<User> {
    try {
      const newUser = await this.usersRepository.create({
        ...input,
        password: bcrypt.hashSync(input.password, 10),
      }); // esto crea el user pero no lo guarda
      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.errorHandler(error);
    }
  }

  findAll(): Promise<User[]> {
    return Promise.resolve([]);
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
    } catch (error) {
      this.errorHandler(error);
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  private errorHandler(error: any) {
    this.logger.error(error);
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('chack server logs');
  }
}
