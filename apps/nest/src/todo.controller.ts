import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schemas/todo.schema';
import { ParamId } from './dto/param.dto';

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
	update(@Param('id') param: ParamId, @Body() dto: UpdateTodoDto): Promise<Todo> {
		return this.todoService.update(param.id, dto);
	}

	@Delete(':id')
	remove(@Param('id') param: ParamId): Promise<Todo> {
		return this.todoService.remove(param.id);
	}
}
