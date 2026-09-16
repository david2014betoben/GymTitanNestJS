import { Module } from '@nestjs/common';
import { PlanesService } from './planes.service.js';
import { PlanesController } from './planes.controller.js';

@Module({
  controllers: [PlanesController],
  providers: [PlanesService],
})
export class PlanesModule {}
