import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SociosService } from './socios.service.js';
import { CreateSociosDto } from './dto/create-socios.dto.js';
import { UpdateSociosDto } from './dto/update-socios.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPCION')
@Controller('socios')
export class SociosController {
  constructor(private readonly sociosService: SociosService) {}

  @Post()
  create(@Body() createSociosDTO: CreateSociosDto) {
    return this.sociosService.create(createSociosDTO);
  }

  @Get()
  findAll() {
    return this.sociosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sociosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSociosDTO: UpdateSociosDto) {
    return this.sociosService.update(+id, updateSociosDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sociosService.remove(+id);
  }
}
