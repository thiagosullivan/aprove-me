import { IsEmail, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class AssignorDTO {
  @IsString()
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @Length(1, 30)
  document: string;

  @IsString()
  @IsEmail()
  @Length(1, 140)
  email: string;

  @IsString()
  @Length(1, 20)
  phone: string;

  @IsString()
  @Length(1, 140)
  name: string;
}
