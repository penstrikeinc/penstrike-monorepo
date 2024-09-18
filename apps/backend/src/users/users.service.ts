import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersService: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { password, ...user } = createUserDto;
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const userCreate = this.usersService.create({
      ...user,
      password: hashPassword,
    });
    return await this.usersService.save(userCreate);
  }

  async findOne(email: string): Promise<Users> {
    const user = await this.usersService.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User with this email does not exist!');
    }
    return user;
  }
}
