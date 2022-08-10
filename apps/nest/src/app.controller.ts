import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './schemas/todo.schema';

@Controller('todos')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post()
	create(@Body() dto: CreateTodoDto): Promise<Todo> {
		return this.appService.create(dto)
	}
}
