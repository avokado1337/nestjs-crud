import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import {
  UserInterface,
  UserPasslessInterface,
  UserService,
} from 'src/providers/User.service';

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  about: string;
}

interface GetUserDto {
  name: string;
  email: string;
  phone: string;
  address: string;
  about: string;
}

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createTodoDto: CreateUserDto) {
    const todo = await this.userService.create(createTodoDto);
    if (!todo) {
      return 'error in creating user';
    }
    return 'user created successfully';
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const users: Array<UserInterface> = await this.userService.findAll();
    return users;
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findById(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    return user;
  }
}
