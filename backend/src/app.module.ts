import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/integrations/assignor/assignor.module';
import { PrismaModule } from './prisma/prisma.module';
import { PayableModule } from './modules/integrations/payable/payable.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AssignorModule, PrismaModule, PayableModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
