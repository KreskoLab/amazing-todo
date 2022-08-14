import { ArgumentsHost, BadRequestException, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException, HttpException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
	catch(exception: BadRequestException, host: ArgumentsHost) {
		const error = exception instanceof WsException ? exception.getError() : exception.getResponse();
		const client = host.switchToWs().getClient<WebSocket>();

		client.send(
			JSON.stringify({
				event: 'error',
				data: error,
			}),
		);
	}
}
