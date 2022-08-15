import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WsResponse,
} from '@nestjs/websockets';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';
import { WsExceptionFilter } from './filters/ws-exception.filter';
import { config } from 'dotenv';
import { ParamsDto } from './dto/params.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schemas/todo.schema';

config();

@WebSocketGateway({ cors: { origin: process.env.FRONTEND_URL } })
@UseFilters(WsExceptionFilter)
export class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(private readonly todoService: TodoService) {}

	private readonly clients: WebSocket[] = [];

	handleConnection(client: WebSocket) {
		this.clients.push(client);
	}

	handleDisconnect(client: WebSocket) {
		for (let i = 0; i < this.clients.length; i++) {
			if (this.clients[i] === client) {
				this.clients.splice(i, 1);
				break;
			}
		}
	}

	private sendToClients(message: WsResponse<Todo>) {
		this.clients.forEach((client) => client.send(JSON.stringify(message)));
	}

	@UsePipes(new ValidationPipe())
	@SubscribeMessage('add-todo')
	async addTodo(@MessageBody() dto: CreateTodoDto): Promise<void> {
		const todo = await this.todoService.create(dto);
		return this.sendToClients({ event: 'add', data: todo });
	}

	@UsePipes(new ValidationPipe())
	@SubscribeMessage('update-todo')
	async updateTodo(@MessageBody() dto: UpdateTodoDto & ParamsDto): Promise<void> {
		const { id, ...rest } = dto;
		const todo = await this.todoService.update(id, rest);
		return this.sendToClients({ event: 'update', data: todo });
	}

	@UsePipes(new ValidationPipe())
	@SubscribeMessage('remove-todo')
	async removeTodo(@MessageBody() dto: ParamsDto): Promise<void> {
		const todo = await this.todoService.remove(dto.id);
		return this.sendToClients({ event: 'remove', data: todo });
	}
}
