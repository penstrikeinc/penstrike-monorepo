import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

// make sure you are using auth guard before using this decorator
export const GetUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user as User;
  },
);

export const GetUserToken = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const hasBearar = request.headers.authorization.split(' ')[0] === 'Bearer';
    const token = hasBearar
      ? request.headers.authorization.split(' ')[1]
      : request.headers.authorization;
    return token;
  },
);
