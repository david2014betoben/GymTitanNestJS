import { PartialType } from '@nestjs/mapped-types';
import { CreateSociosDto } from './create-socios.dto.js';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSociosDto extends PartialType(CreateSociosDto) {
  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
