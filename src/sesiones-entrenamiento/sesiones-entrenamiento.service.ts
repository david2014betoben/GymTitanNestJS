import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSesionesEntrenamientoDto } from './dto/create-sesiones-entrenamiento.dto.js';
import { UpdateSesionesEntrenamientoDto } from './dto/update-sesiones-entrenamiento.dto.js';

@Injectable()
export class SesionesEntrenamientoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateSesionesEntrenamientoDto) {
    try {
      const socio = await this.prisma.socio.findUnique({
        where: { id: createDto.socioId },
      });
      if (!socio)
        throw new NotFoundException(
          `Socio con id ${createDto.socioId} no existe`,
        );

      const entrenador = await this.prisma.usuario.findUnique({
        where: { id: createDto.entrenadorId },
      });
      if (!entrenador)
        throw new NotFoundException(
          `Entrenador con id ${createDto.entrenadorId} no existe`,
        );

      return await this.prisma.sesionEntrenamiento.create({
        data: {
          socioId: createDto.socioId,
          entrenadorId: createDto.entrenadorId,
          fechaHora: createDto.fechaHora,
        },
        include: { socio: true, entrenador: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear la sesión de entrenamiento',
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.sesionEntrenamiento.findMany({
        include: { socio: true, entrenador: true },
        orderBy: { fechaHora: 'asc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener las sesiones de entrenamiento',
      );
    }
  }

  async findOne(id: number) {
    const sesion = await this.prisma.sesionEntrenamiento.findUnique({
      where: { id },
    });
    if (!sesion) throw new NotFoundException(`Sesión con id ${id} no existe`);
    return sesion;
  }

  async update(id: number, updateDto: UpdateSesionesEntrenamientoDto) {
    const sesion = await this.prisma.sesionEntrenamiento.findUnique({
      where: { id },
    });
    if (!sesion) throw new NotFoundException(`Sesión con id ${id} no existe`);
    return this.prisma.sesionEntrenamiento.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    const sesion = await this.prisma.sesionEntrenamiento.findUnique({
      where: { id },
    });
    if (!sesion) throw new NotFoundException(`Sesión con id ${id} no existe`);
    return this.prisma.sesionEntrenamiento.delete({ where: { id } });
  }

  async getSesionesDelDia(entrenadorId: number, inicio: Date, fin: Date) {
    try {
      const entrenador = await this.prisma.usuario.findUnique({
        where: { id: entrenadorId },
      });
      if (!entrenador)
        throw new NotFoundException(
          `Entrenador con id ${entrenadorId} no existe`,
        );

      return await this.prisma.sesionEntrenamiento.findMany({
        where: {
          entrenadorId,
          fechaHora: { gte: inicio, lte: fin },
        },
        include: { socio: true },
        orderBy: { fechaHora: 'asc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener las sesiones del día',
      );
    }
  }

  async actualizarEstado(
    id: number,
    estado: 'PROGRAMADA' | 'ASISTIO' | 'FALTO',
  ) {
    try {
      const sesion = await this.prisma.sesionEntrenamiento.findUnique({
        where: { id },
      });
      if (!sesion) throw new NotFoundException(`Sesión con id ${id} no existe`);

      return await this.prisma.sesionEntrenamiento.update({
        where: { id },
        data: { estado },
        include: { socio: true, entrenador: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al actualizar el estado de la sesión',
      );
    }
  }

  async contarSesionesCompletadas(entrenadorId: number) {
    try {
      const entrenador = await this.prisma.usuario.findUnique({
        where: { id: entrenadorId },
      });
      if (!entrenador)
        throw new NotFoundException(
          `Entrenador con id ${entrenadorId} no existe`,
        );

      return await this.prisma.sesionEntrenamiento.count({
        where: { entrenadorId, estado: 'ASISTIO' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al contar las sesiones completadas',
      );
    }
  }
}
