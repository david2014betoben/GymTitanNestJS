import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { SesionesEntrenamientoService } from './sesiones-entrenamiento.service.js';
import { CreateSesionesEntrenamientoDto } from './dto/create-sesiones-entrenamiento.dto.js';
import { UpdateSesionesEntrenamientoDto } from './dto/update-sesiones-entrenamiento.dto.js';

@Controller('sesiones-entrenamiento')
export class SesionesEntrenamientoController {
  constructor(
    private readonly sesionesEntrenamientoService: SesionesEntrenamientoService,
  ) {}

  @Post()
  create(@Body() createDto: CreateSesionesEntrenamientoDto) {
    return this.sesionesEntrenamientoService.create(createDto);
  }

  @Get()
  findAll() {
    return this.sesionesEntrenamientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sesionesEntrenamientoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSesionesEntrenamientoDto,
  ) {
    return this.sesionesEntrenamientoService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sesionesEntrenamientoService.remove(+id);
  }

  // Endpoint para sesiones del día de un entrenador
  @Get('entrenador/:entrenadorId/sesiones-del-dia')
  getSesionesDelDia(
    @Param('entrenadorId') entrenadorId: string,
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.sesionesEntrenamientoService.getSesionesDelDia(
      +entrenadorId,
      new Date(inicio),
      new Date(fin),
    );
  }

  // Endpoint para actualizar estado de una sesión
  @Patch(':id/estado')
  actualizarEstado(
    @Param('id') id: string,
    @Body('estado') estado: 'PROGRAMADA' | 'ASISTIO' | 'FALTO',
  ) {
    return this.sesionesEntrenamientoService.actualizarEstado(+id, estado);
  }

  // Endpoint para contar sesiones completadas de un entrenador
  @Get('entrenador/:entrenadorId/completadas')
  contarSesionesCompletadas(@Param('entrenadorId') entrenadorId: string) {
    return this.sesionesEntrenamientoService.contarSesionesCompletadas(
      +entrenadorId,
    );
  }
}
