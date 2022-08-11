import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schemas/todo.schema';

@Controller('todos')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Get()
	getAll(): Promise<Todo[]> {
		return this.todoService.findAll();
	}

	@Post()
	create(@Body() dto: CreateTodoDto): Promise<Todo> {
		return this.todoService.create(dto);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() dto: UpdateTodoDto): Promise<Todo> {
		return this.todoService.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<Todo> {
		return this.todoService.remove(id);
	}
}
