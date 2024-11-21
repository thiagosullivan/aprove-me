import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/integrations/assignor/assignor.module';
import { PrismaModule } from './prisma/prisma.module';
import { PayableModule } from './modules/integrations/payable/payable.module';

@Module({
  imports: [AssignorModule, PrismaModule, PayableModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
