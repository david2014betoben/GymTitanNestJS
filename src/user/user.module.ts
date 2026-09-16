import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
