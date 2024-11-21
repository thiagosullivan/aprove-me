import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableDTO } from '../dto/payable.dto';

@Controller('integrations')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post('payable')
  async create(@Body() data: PayableDTO) {
    return this.payableService.create(data);
  }

  @Get('payable')
  async findAllPayable() {
    return this.payableService.findAllPayable();
  }

  @Get('payable/:id')
  async findPayable(@Param('id') id: string) {
    return this.payableService.findPayable(id);
  }

  @Put('payable/:id')
  async updatePayable(@Param('id') id: string, @Body() data) {
    return this.payableService.updatePayable(id, data);
  }

  @Delete('payable/:id')
  async deletePayable(@Param('id') id: string) {
    return this.payableService.deletePayable(id);
  }
}
