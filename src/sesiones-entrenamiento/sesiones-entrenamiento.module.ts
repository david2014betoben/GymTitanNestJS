import { Module } from '@nestjs/common';
import { SesionesEntrenamientoService } from './sesiones-entrenamiento.service.js';
import { SesionesEntrenamientoController } from './sesiones-entrenamiento.controller.js';

@Module({
  controllers: [SesionesEntrenamientoController],
  providers: [SesionesEntrenamientoService],
})
export class SesionesEntrenamientoModule {}
