import { IUser } from './user';

export interface JwtReturnType {
  user: IUser;
  access_token: string;
}
