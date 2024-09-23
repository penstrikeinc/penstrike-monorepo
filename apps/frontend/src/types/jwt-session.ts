import { IUser } from './user';

export interface JwtReturnType {
  user: IUser;
  access_token: string;
}

export enum CacheGroupEnum {
  SESSION = 'SESSION',
  USER = 'USER',
  PENTESTS = 'PENTESTS',
}

export interface SessionPayload {
  email: string;
  userName: string;
  id: string;
}
