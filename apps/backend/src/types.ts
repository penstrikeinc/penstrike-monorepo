export enum CacheGroupEnum {
  SESSION = 'SESSION',
  USER = 'USER',
  PENTESTS = 'PENTESTS',
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JwtPayloadReturnType {
  access_token: string;
  user: IUser;
}
