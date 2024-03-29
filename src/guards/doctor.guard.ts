import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DoctorGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prisma:PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];

        const isBlocked=await this.prisma.blacklist.findUnique({where:{token}});
    if(isBlocked)
    {
      return false;
    }

    try {
      const payload = this.jwtService.verify(token);
      const role = payload.role;
      const userId = payload.userId; // Get the userId from the JWT payload

      const routeId = request.params.id; // Get the 'id' parameter from the URL

      // Check if the userId from the JWT matches the 'id' from the URL
      const isAuthorized = userId === routeId || role === 'Admin';

      // Also check if the user is a Doctor or Admin
      const isDoctor = role === 'Doctor' || role === 'Admin';

      return isAuthorized && isDoctor;
    } catch (error) {
      return false;
    }
  }
}