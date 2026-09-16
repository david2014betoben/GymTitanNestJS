import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

const trim = () =>
  Transform(({ value }) => (typeof value === 'string' ? value.trim() : value));

export class CreateSociosDto {
  @trim()
  @IsString({ message: 'el nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'el nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'El nombre  no puede contener solo espacios',
  })
  @MaxLength(100)
  nombre: string;

  @trim()
  @IsString({ message: 'el apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'el apellido es obligatorio' })
  @MinLength(2, { message: 'El apellido debe tener almenos 2 caracteres' })
  @MaxLength(100)
  apellido: string;

  @IsOptional()
  @trim()
  @IsString()
  @Matches(/^\d{9}$/, { message: 'El teléfono debe tener 9 dígitos' })
  telefono?: string;

  @IsOptional()
  @trim()
  @IsEmail({}, { message: 'el email debe estar en el formato correcto' })
  email: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de nacimiento debe ser una fecha válida' },
  )
  fechaNacimiento?: string;
}
