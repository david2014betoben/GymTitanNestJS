import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembresiaService } from './membresia.service.js';
import { CreateMembresiaDto } from './dto/create-membresia.dto.js';
import { UpdateMembresiaDto } from './dto/update-membresia.dto.js';

@Controller('membresia')
export class MembresiaController {
  constructor(private readonly membresiaService: MembresiaService) {}

  @Post()
  create(@Body() createMembresiaDto: CreateMembresiaDto) {
    return this.membresiaService.create(createMembresiaDto);
  }

  @Get()
  findAll() {
    return this.membresiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membresiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMembresiaDto: UpdateMembresiaDto) {
    return this.membresiaService.update(+id, updateMembresiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membresiaService.remove(+id);
  }
}
