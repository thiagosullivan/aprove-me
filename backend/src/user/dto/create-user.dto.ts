import { User } from '../entities/user.entity';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto extends User {
  @IsString()
  login: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  name: string;
}
