import { PartialType } from '@nestjs/mapped-types';
import { CreateSesionesEntrenamientoDto } from './create-sesiones-entrenamiento.dto.js';

export class UpdateSesionesEntrenamientoDto extends PartialType(CreateSesionesEntrenamientoDto) {}
