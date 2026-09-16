import {
 IsString,
 IsNotEmpty,
 MinLength,
 Matches,
 IsOptional,
 IsNumber,
 IsPositive,
 IsBoolean
  } from 'class-validator';
  import { Type } from 'class-transformer';
  export class CreatePlanDto {

  @IsString({ message: 'el nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'el nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'El nombre  no puede contener solo espacios',
  })
  nombre: string;


  @IsOptional()
  @IsString({ message: 'la descripcion debe ser una cadena de texto' })
  @MinLength(2, { message: 'la descripcion debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'la descripcion  no puede contener solo espacios',
  })
  descripcion?: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'el precio es obligatorio' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'EL PRECIO DEBE SER UN NUMERO CON HASTA 2 DECIMALES' },
  )
  @IsPositive({ message: 'el precio debe ser positivo' })
  precioMes: number;

  @IsBoolean({
  message: 'el estado debe ser verdadero o falso',
  })
  @IsOptional()
  estado?: boolean;
  }