import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanDto } from './create-plane.dto.js';

export class UpdatePlanDto extends PartialType(CreatePlanDto) {}
