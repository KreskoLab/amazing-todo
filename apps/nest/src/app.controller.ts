import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schemas/todo.schema';

@Controller('todos')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getAll(): Promise<Todo[]> {
		return this.appService.findAll()
	}

	@Post()
	create(@Body() dto: CreateTodoDto): Promise<Todo> {
		return this.appService.create(dto)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() dto: UpdateTodoDto): Promise<Todo> {
		return this.appService.update(id, dto)
	}
}
