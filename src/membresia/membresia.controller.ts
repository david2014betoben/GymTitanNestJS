import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { MembresiaService } from './membresia.service.js';
import { CreateMembresiaDto } from './dto/create-membresia.dto.js';
import { UpdateMembresiaDto } from './dto/update-membresia.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('membresia')
@ApiBearerAuth()
export class MembresiaController {
  constructor(private readonly membresiaService: MembresiaService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("RECEPCION")
  create(@Body() createMembresiaDto: CreateMembresiaDto) {
    return this.membresiaService.create(createMembresiaDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.membresiaService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  findOne(@Param('id') id: string) {
    return this.membresiaService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("RECEPCION", "ADMINISTRACION")
  update(@Param('id') id: string, @Body() updateMembresiaDto: UpdateMembresiaDto) {
    return this.membresiaService.update(+id, updateMembresiaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("RECEPCION", "ADMINISTRACION")
  remove(@Param('id') id: string) {
    return this.membresiaService.remove(+id);
  }
}
