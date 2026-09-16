import { IsInt, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSesionesEntrenamientoDto {
  @IsInt()
  @Min(1, { message: 'El socioId debe ser un número positivo' })
  @Type(() => Number)
  socioId: number;

  @IsInt()
  @Min(1, { message: 'El entrenadorId debe ser un número positivo' })
  @Type(() => Number)
  entrenadorId: number;

  @IsDateString()
  @Type(() => Date)
  fechaHora: Date;
}
