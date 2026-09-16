import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { Prisma } from '../generated/prisma/client.js';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDTO: CreateUserDto) {
    const { password, ...rest } = createUserDTO;

    try {
      return await this.prisma.usuario.create({
        data: {
          ...rest,
          passwordHash: await bcrypt.hash(password, 10),
        },
        omit: { passwordHash: true },
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
      return this.prisma.usuario.findMany({
        orderBy: { id: 'asc' },
      });
    } catch (error) {
      return error;
    }
  }
  async findOne(id: number) {
    try {
      const user = await this.prisma.usuario.findUnique({
        where: { id },
      });
      if (!user) {
        throw new ConflictException(`usuario de ID: ${id} no encontrado`);
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.usuario.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.usuario.findUnique({
        where: { id },
      });
      return await this.prisma.usuario.update({
        where: { id },
        data: { estado: false },
        omit: { passwordHash: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new ConflictException(`Usuario de ID ${id} no encontrado`);
    }
    throw error;
  }
}
