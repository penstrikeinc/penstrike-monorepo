import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersService: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const userCreate = this.usersService.create({
      ...createUserDto,
      password: hashPassword,
    });
    const result = await this.usersService.save(userCreate);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = result;
    return rest;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.usersService.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User with this email does not exist!');
    }
    return user;
  }
}
