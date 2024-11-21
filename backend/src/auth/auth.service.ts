import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(login: string, password: string) {
    throw new Error('Method not implemented.');
  }
}
