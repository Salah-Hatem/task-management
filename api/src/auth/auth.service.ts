import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';
import { AuthJwtPayload } from 'src/types/auth-jwtpayload';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: Prisma.UserCreateInput) {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) throw new ConflictException('Email already exists');
    return this.userService.create(createUserDto);
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');
    const { accessToken } = await this.generateJwtToken(user.id);
    return { id: user.id, name: user.name, accessToken };
  }

  async generateJwtToken(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload),
    ]);
    return { accessToken };
  }

  async validateJwtUser(userId: string) {
    // Check if user exists in the database
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found');
    const userObj = { id: user.id, name: user.name };
    return userObj;
  }
}
