import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plane.dto.js';
import { UpdatePlanDto } from './dto/update-plane.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class PlanesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPlanDto: CreatePlanDto) {
    try {
      return await this.prisma.plan.create({
        data: createPlanDto,
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.plan.findMany({
        orderBy: { id: 'asc' },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.plan.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`plan de ID: ${id} no encontrado`);
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, UpdatePlanDto: UpdatePlanDto) {
    try {
      return await this.prisma.plan.update({
        where: { id },
        data: UpdatePlanDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.plan.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`plan de ID: ${id} no encontrado`);
      }
      return await this.prisma.plan.delete({
        where: { id },
      });
    } catch (error) {
      return error;
    }
  }
}
