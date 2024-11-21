import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class PayableDTO {
  id?: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  emissionDate: string;

  @IsString()
  @IsNotEmpty()
  assignorId: string;
}
