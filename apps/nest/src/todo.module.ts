import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { TodoGateway } from './todo.gateway';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `${process.cwd()}/.env`,
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGODB_URI'),
				dbName: configService.get<string>('MONGODB_NAME'),
			}),
			inject: [ConfigService],
		}),
		MongooseModule.forFeature([
			{
				name: Todo.name,
				schema: TodoSchema,
			},
		]),
	],
	controllers: [TodoController],
	providers: [TodoService, TodoGateway],
})
export class TodoModule {}
