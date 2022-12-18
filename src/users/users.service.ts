import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(options?: FindManyOptions<User>) {
    return this.usersRepository.find(options);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
