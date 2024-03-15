import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PatientGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];

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