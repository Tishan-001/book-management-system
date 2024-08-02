import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<LoginResponse> {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
      _id: user._id.toString(),
    };
  }

  extractUserIdFromToken(token: string): string | undefined {
    try {
      const decoded = this.jwtService.decode(token);
      return decoded?.sub;
    } catch (err) {
      console.error('Error decoding JWT:', err);
      return undefined;
    }
  }
}
