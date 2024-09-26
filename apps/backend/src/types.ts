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

export interface IAssetBE {
  assetsName: string;
  targetUrl: string;
  user: IUser;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface JwtPayloadReturnType {
  access_token: string;
  user: IUser;
}

export interface IJwtPayload {
  email: string;
  userName: string;
  id: string;
  iat: number;
  exp: number;
}
