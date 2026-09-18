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

    return await this.prisma.usuario.create({
      data: {
        ...rest,
        passwordHash: await bcrypt.hash(password, 10),
      },
      omit: { passwordHash: true },
    });
  }

  async findAll() {
    return this.prisma.usuario.findMany({
      orderBy: { id: 'asc' },
    });
  }
  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (!user) {
      throw new ConflictException(`usuario de ID: ${id} no encontrado`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        rol: true,
        creadoEn: true,
        passwordHash: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.usuario.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.usuario.update({
      where: { id },
      data: { estado: false },
      omit: { passwordHash: true },
    });
  }
}
