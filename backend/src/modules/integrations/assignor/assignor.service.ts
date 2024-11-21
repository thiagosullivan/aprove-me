import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssignorDTO } from '../dto/assignor.dto';

@Injectable()
export class AssignorService {
  constructor(private prisma: PrismaService) {}

  async create(data: AssignorDTO) {
    const assignorExists = await this.prisma.assignor.findUnique({
      where: {
        email: data.email,
      },
    });

    if (assignorExists) {
      throw new Error('Cedente já cadastrado com esse e-mail');
    }

    const assignor = await this.prisma.assignor.create({
      data,
    });
    return assignor;
  }

  async findAllAssignors() {
    return this.prisma.assignor.findMany();
  }

  async findAssignor(id: string) {
    const assignorExists = await this.prisma.assignor.findUnique({
      where: {
        id,
      },
    });

    if (!assignorExists) {
      throw new Error('O cedente não existe');
    }

    return assignorExists;
  }

  async updateAssignor(id: string, data: AssignorDTO) {
    const assignorExists = await this.prisma.assignor.findUnique({
      where: {
        id,
      },
    });

    if (!assignorExists) {
      throw new Error('O cedente não existe');
    }

    return await this.prisma.assignor.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleteAssignor(id: string) {
    const assignorExists = await this.prisma.assignor.findUnique({
      where: {
        id,
      },
    });

    if (!assignorExists) {
      throw new Error('O cedente não existe');
    }

    await this.prisma.assignor.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Cedente deletado com sucesso!',
    };
  }
}
