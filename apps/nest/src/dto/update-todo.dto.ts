import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  	title: string

  @IsOptional()
  @IsBoolean()
  	completed: boolean
}