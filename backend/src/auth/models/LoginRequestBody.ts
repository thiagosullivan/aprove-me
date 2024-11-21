import { IsString } from 'class-validator';

export class LoginRequestBody {
  //   @IsEmail()
  //   email: string;
  @IsString()
  login: string;

  @IsString()
  password: string;
}
