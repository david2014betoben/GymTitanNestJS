import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }

  async login(LoginDto: LoginDto) {
    const user = await this.userService.findByEmail(LoginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales Invalidas');
    }
    const isMatch = await bcrypt.compare(
      LoginDto.passwordHash,
      user.passwordHash,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales Invalidas');
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol, nombre: user.nombre },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' },
    );
    return { token };
  }
}
