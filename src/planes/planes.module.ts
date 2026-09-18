import { Module } from '@nestjs/common';
import { PlanesService } from './planes.service.js';
import { PlanesController } from './planes.controller.js';

@Module({
  imports: [],
  controllers: [PlanesController],
  providers: [PlanesService],
  exports: [PlanesService],
})
export class PlanesModule {}
