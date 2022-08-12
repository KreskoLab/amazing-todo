import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schemas/todo.schema';
import { ParamsDto } from './dto/params.dto';

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
	update(@Param() params: ParamsDto, @Body() dto: UpdateTodoDto): Promise<Todo> {
		return this.todoService.update(params.id, dto);
	}

	@Delete(':id')
	remove(@Param() params: ParamsDto): Promise<Todo> {		
		return this.todoService.remove(params.id);
	}
}
