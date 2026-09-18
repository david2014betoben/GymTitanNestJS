import { Module } from '@nestjs/common';
import { MembresiaService } from './membresia.service.js';
import { MembresiaController } from './membresia.controller.js';

@Module({
  controllers: [MembresiaController],
  providers: [MembresiaService],
  exports:[MembresiaService]
})
export class MembresiaModule {}
