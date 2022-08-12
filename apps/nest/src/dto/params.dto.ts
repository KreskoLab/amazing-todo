import { IsNotEmpty, IsMongoId } from 'class-validator';

export class ParamsDto {
	@IsNotEmpty()
	@IsMongoId()
	id: string;
}
