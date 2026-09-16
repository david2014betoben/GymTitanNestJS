import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMembresiaDto } from './dto/create-membresia.dto.js';
import { UpdateMembresiaDto } from './dto/update-membresia.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MembresiaService {
  constructor(private readonly prisma:PrismaService){}

  async create(createMembresiaDto: CreateMembresiaDto) {
    const socio = await this.prisma.socio.findUnique({
      where:{id: createMembresiaDto.socioId},
    });
    if(!socio){
      throw new NotFoundException("Socio no encontrado");
    }
    
    const plan = await this.prisma.plan.findUnique({
      where:{id:createMembresiaDto.planId},
    });
    if(!plan){
      throw new NotFoundException("Plan no encontrado")
    }

    return await this.prisma.membresia.create({
      data: createMembresiaDto,
    });
  }

  async findAll() {
    return await this.prisma.membresia.findMany({
      include:{socio:true, plan:true,},
      orderBy:{id:"asc"},
    });
  }

  async findOne(id: number) {
    const encontrado = await this.prisma.membresia.findUnique({
      where:{id},
      include:{socio:true, plan:true},
    });
    if(!encontrado){
      throw new NotFoundException("Membresia no encontrada");
    }

    return encontrado;
  }

  async update(id: number, updateMembresiaDto: UpdateMembresiaDto) {
    const encontrado = await this.prisma.membresia.findUnique({
      where:{id},
    });
    if(!encontrado){
      throw new NotFoundException("Membresia no encontrada");
    }

    return await this.prisma.membresia.update({
      where:{id},
      data: updateMembresiaDto,
    });
  }

  async remove(id: number) {
    const encontrado = await this.prisma.membresia.findUnique({
      where:{id},
    });
    if(!encontrado){
      throw new NotFoundException("Membresia no encontrada");
    }

    return this.prisma.membresia.delete({
      where:{id},
    });
  }
}
