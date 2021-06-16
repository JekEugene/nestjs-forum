import { CanActivate, ExecutionContext, Injectable, Response, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    let cookie = req.cookies
    if (!cookie.name || cookie == undefined) {
      req.user = {role: 'guest',
                  name: 'guest'
      }
      return roles.includes(req.user.role)
    } else {
      req.user = {
        id: cookie.id,
        name: cookie.name,
        role: cookie.role,
      }
      return roles.includes(req.cookies.role)
    }
  }
}
