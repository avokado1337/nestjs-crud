import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User.entity';
import * as bcrypt from 'bcrypt';

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  about: string;
}

export interface UserPasslessInterface {
  name: string;
  email: string;
  phone: string;
  address: string;
  about: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<UserInterface>,
  ) {}
  create(user: UserInterface): Promise<UserInterface> {
    const newUser = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(user.password, saltRounds);
    user.password = hash;
    newUser.password = user.password;
    newUser.phone = user.phone;
    newUser.address = user.address;
    newUser.about = user.about;
    return this.userRepository.save(this.userRepository.create(newUser));
  }
  findById(id: number): Promise<UserInterface> {
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    return user;
  }
  findAll(): Promise<UserInterface[]> {
    return this.userRepository.find();
  }
}
