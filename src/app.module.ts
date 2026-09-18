import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { SociosModule } from './socios/socios.module.js';
import { SesionesEntrenamientoModule } from './sesiones-entrenamiento/sesiones-entrenamiento.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { MembresiaModule } from './membresia/membresia.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PlanesModule } from './planes/planes.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'gym-titan-nest-js',
    }),
    AuthModule,
    UserModule,
    SociosModule,
    SesionesEntrenamientoModule,
    PrismaModule,
    MembresiaModule,
    PlanesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
