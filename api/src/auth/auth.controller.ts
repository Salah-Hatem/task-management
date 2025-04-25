import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { Public } from './decorators/puplic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  registerUser(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @Post('signin')
  loginUser(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
