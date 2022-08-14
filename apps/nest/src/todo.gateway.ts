import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';
import { WsExceptionFilter } from './filters/ws-exception.filter';
import { config } from 'dotenv';

config();

@WebSocketGateway({ cors: { origin: process.env.FRONTEND_URL } })
@UseFilters(WsExceptionFilter)
export class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(private readonly todoService: TodoService) {}

	private readonly clients: WebSocket[] = []

	handleConnection(client: WebSocket) {
		this.clients.push(client)
	}

	 handleDisconnect(client: WebSocket) {
		for (let i = 0; i < this.clients.length; i++) {
			if (this.clients[i] === client) {
				this.clients.splice(i, 1);
				break;
			}
		}
	}

	private sendToClients(message: WsResponse['data']) {
		this.clients.forEach((client) => client.send(message))
	}

	@UsePipes(new ValidationPipe())
	@SubscribeMessage('add-todo')
	async onEvent(@MessageBody() dto: CreateTodoDto): Promise<void> {
		const todo = await this.todoService.create(dto);
		return this.sendToClients(JSON.stringify(todo))
	}
}
