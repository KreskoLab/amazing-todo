import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class AppService {
	constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

	public async create(dto: CreateTodoDto): Promise<Todo> {
		return this.todoModel.create(dto)
	}
}
