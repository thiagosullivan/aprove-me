import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/integrations/assignor/assignor.module';
import { PrismaModule } from './prisma/prisma.module';
import { PayableModule } from './modules/integrations/payable/payable.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AssignorModule, PrismaModule, PayableModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
