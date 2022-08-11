import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo.module';

async function bootstrap() {
	const app = await NestFactory.create(TodoModule);
	const configService = app.get<ConfigService>(ConfigService);

	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: configService.get<string>('FRONTEND_URL'),
	});

	await app.listen(configService.get<number>('PORT') || 8000);
}
bootstrap();
