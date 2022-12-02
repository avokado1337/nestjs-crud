import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoInterface, TodoService } from 'src/providers/Todo.service';

interface CreateTodoDto {
  name: string;
  complete: boolean;
}

@Controller('cats')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const todo = await this.todoService.create(createTodoDto);
    if (!todo) {
      return 'error in creating todo';
    }
    return 'todo created successfully';
  }
  @Get()
  async findAll() {
    const cats: Array<TodoInterface> = await this.todoService.findAll();
    return cats;
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const newCat: any = await this.todoService.update(id, body);
    return newCat;
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.todoService.delete(id);
    return 'cat deleted';
  }
}
