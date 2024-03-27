import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PatientGuard implements CanActivate {
  constructor(private jwtService: JwtService,private prisma:PrismaService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
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
      const role= payload.role
    const userId = payload.userId;

        const routeId = request.params.id;
        const isAuthorized = userId === routeId || role === 'Admin';


        const isPatient = role === 'Patient' || role === 'Admin';

        return isAuthorized && isPatient;
    } catch (error) {
      return false;
    }
  }
}