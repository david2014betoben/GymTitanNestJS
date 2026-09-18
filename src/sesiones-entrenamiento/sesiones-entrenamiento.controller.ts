import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SesionesEntrenamientoService } from './sesiones-entrenamiento.service.js';
import { CreateSesionesEntrenamientoDto } from './dto/create-sesiones-entrenamiento.dto.js';
import { UpdateSesionesEntrenamientoDto } from './dto/update-sesiones-entrenamiento.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('sesiones-entrenamiento')
export class SesionesEntrenamientoController {
  constructor(
    private readonly sesionesEntrenamientoService: SesionesEntrenamientoService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRACION', 'RECEPCION')
  create(@Body() createDto: CreateSesionesEntrenamientoDto) {
    return this.sesionesEntrenamientoService.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRACION', 'RECEPCION')
  findAll() {
    return this.sesionesEntrenamientoService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRACION', 'RECEPCION')
  findOne(@Param('id') id: string) {
    return this.sesionesEntrenamientoService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRACION')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSesionesEntrenamientoDto,
  ) {
    return this.sesionesEntrenamientoService.update(+id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRACION')
  remove(@Param('id') id: string) {
    return this.sesionesEntrenamientoService.remove(+id);
  }

  // Endpoint para sesiones del día de un entrenador
  @Get('entrenador/:entrenadorId/sesiones-del-dia')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRACION', 'ENTRENADOR')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRACION', 'ENTRENADOR')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estado: {
          type: 'string',
          enum: ['PROGRAMADA', 'ASISTIO', 'FALTO'],
        },
      },
    },
  })
  actualizarEstado(
    @Param('id') id: string,
    @Body() body: { estado: 'PROGRAMADA' | 'ASISTIO' | 'FALTO' },
  ) {
    return this.sesionesEntrenamientoService.actualizarEstado(+id, body.estado);
  }

  // Endpoint para contar sesiones completadas de un entrenador
  @Get('entrenador/:entrenadorId/completadas')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRACION')
  contarSesionesCompletadas(@Param('entrenadorId') entrenadorId: string) {
    return this.sesionesEntrenamientoService.contarSesionesCompletadas(
      +entrenadorId,
    );
  }
}
