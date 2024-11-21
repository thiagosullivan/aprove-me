import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorDTO } from '../dto/assignor.dto';

@Controller('integrations')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post('assignor')
  async create(@Body() data: AssignorDTO) {
    return this.assignorService.create(data);
  }

  @Get('assignor')
  async findAllAssignors() {
    return this.assignorService.findAllAssignors();
  }

  @Get('assignor/:id')
  async findAssignor(@Param('id') id: string) {
    return this.assignorService.findAssignor(id);
  }

  @Put('assignor/:id')
  async update(@Param('id') id: string, @Body() data: AssignorDTO) {
    return this.assignorService.updateAssignor(id, data);
  }

  @Delete('assignor/:id')
  async deleteAssignor(@Param('id') id: string) {
    return this.assignorService.deleteAssignor(id);
  }
}
