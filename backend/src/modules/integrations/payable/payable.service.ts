import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PayableDTO } from '../dto/payable.dto';

@Injectable()
export class PayableService {
  constructor(private prisma: PrismaService) {}

  async create(data: PayableDTO) {
    const payable = await this.prisma.payable.create({
      data,
    });
    return payable;
  }

  async findAllPayable() {
    return this.prisma.payable.findMany();
  }

  async findPayable(id: string) {
    const payableExists = await this.prisma.payable.findUnique({
      where: {
        id,
      },
    });

    if (!payableExists) {
      throw new Error('O recebível não existe');
    }

    return payableExists;
  }

  async updatePayable(id: string, data: PayableDTO) {
    const payableExists = await this.prisma.payable.findUnique({
      where: {
        id,
      },
    });

    if (!payableExists) {
      throw new Error('O recebível não existe');
    }

    return await this.prisma.payable.update({
      data,
      where: {
        id,
      },
    });
  }

  async deletePayable(id: string) {
    const payableExists = await this.prisma.payable.findUnique({
      where: {
        id,
      },
    });

    if (!payableExists) {
      throw new Error('O recebível não existe');
    }

    await this.prisma.payable.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Recebível deletado com sucesso!',
    };
  }
}
