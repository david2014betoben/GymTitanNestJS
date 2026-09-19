import { IsInt, IsDateString, Min, MinDate } from 'class-validator';
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

  @IsDateString(
    {},
    { message: 'fechaHora debe ser una fecha válida en formato ISO 8601' },
  )
  fechaHora: string;
}
