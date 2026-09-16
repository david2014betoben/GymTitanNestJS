import { Module } from '@nestjs/common';
import { SociosService } from './socios.service.js';

@Module({
  providers: [SociosService]
})
export class SociosModule {}
