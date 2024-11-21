import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/integrations/assignor/assignor.module';
import { PrismaModule } from './prisma/prisma.module';
import { PayableModule } from './modules/integrations/payable/payable.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    AssignorModule,
    PrismaModule,
    PayableModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
