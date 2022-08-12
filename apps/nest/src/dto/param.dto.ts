import { IsNotEmpty, IsMongoId } from 'class-validator';

export class ParamId {
	@IsNotEmpty()
	@IsMongoId()
	id: string;
}
