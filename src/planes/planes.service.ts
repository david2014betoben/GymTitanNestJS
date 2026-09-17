import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plane.dto.js';
import { UpdatePlanDto } from './dto/update-plane.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class PlanesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPlanDto: CreatePlanDto) {
    return await this.prisma.plan.create({
      data: createPlanDto,
    });
  }
  async findAll() {
    return this.prisma.plan.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.plan.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`plan de ID: ${id} no encontrado`);
    }
    return user;
  }

  async update(id: number, UpdatePlanDto: UpdatePlanDto) {
    return await this.prisma.plan.update({
      where: { id },
      data: UpdatePlanDto,
    });
  }

  async remove(id: number) {
    const user = await this.prisma.plan.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`plan de ID: ${id} no encontrado`);
    }
    return await this.prisma.plan.delete({
      where: { id },
    });
  }
}
