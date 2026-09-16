import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSociosDto } from './dto/create-socios.dto.js';
import { UpdateSociosDto } from './dto/update-socios.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class SociosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSociosDTO: CreateSociosDto) {
    try {
      return await this.prisma.socio.create({
        data: createSociosDTO,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new ConflictException('Ese email ya está registrado');
    }
  }

  async findAll() {
    try {
      return this.prisma.socio.findMany({
        orderBy: { id: 'asc' },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const socio = await this.prisma.socio.findUnique({
        where: { id },
      });
      if (!socio) {
        throw new NotFoundException(`Socio con ID: ${id} no encontrado.`);
      }
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateSociosDTO: UpdateSociosDto) {
    try {
      return await this.prisma.socio.update({
        where: { id },
        data: updateSociosDTO,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Socio de ID ${id} no encontrado`);
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Ese email ya está registrado');
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.socio.update({
        where: { id },
        data: { estado: false },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new ConflictException(`Socio con ID ${id} no encontrado`);
    }
  }
}
