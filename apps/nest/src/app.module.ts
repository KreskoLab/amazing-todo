import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `${process.cwd()}/.env`
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGODB_URI'),
				dbName: configService.get<string>('MONGODB_NAME')
			}),
			inject: [ConfigService]
		}),
		MongooseModule.forFeature([
			{
				name: Todo.name,
				schema: TodoSchema
			}
		])
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
