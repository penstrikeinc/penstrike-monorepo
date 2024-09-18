import { IUser } from './user';

export interface JwtReturnType {
  user: IUser;
  accessToken: string;
}
