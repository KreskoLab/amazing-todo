import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './schemas/todo.schema';
import { TodoService } from './todo.service';
import { WsExceptionFilter } from './filters/ws-exception.filter';
import { config } from 'dotenv';

config();

@WebSocketGateway({ cors: { origin: process.env.FRONTEND_URL } })
@UseFilters(WsExceptionFilter)
export class TodoGateway {
	constructor(private readonly todoService: TodoService) {}

	@UsePipes(new ValidationPipe())
	@SubscribeMessage('add-todo')
	async onEvent(@MessageBody() dto: CreateTodoDto): Promise<WsResponse<Todo>> {
		const todo = await this.todoService.create(dto);
		return { event: 'add-todo', data: todo };
	}
}
