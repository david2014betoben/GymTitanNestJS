import { Module } from '@nestjs/common';
import { SociosService } from './socios.service.js';
import { SociosController } from './socios.controller.js';

@Module({
  imports: [],
  providers: [SociosService],
  controllers: [SociosController],
  exports: [SociosService],
})
export class SociosModule {}
