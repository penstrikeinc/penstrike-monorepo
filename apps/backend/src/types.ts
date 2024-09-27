export enum CacheGroupEnum {
  SESSION = 'SESSION',
  USER = 'USER',
  PENTESTS = 'PENTESTS',
}

export enum AssetStatusEnum {
  ACTIVE = 'ACTIVE',
  UNDER_REVIEW = 'UNDER_REVIEW',
  INACTIVE = 'INACTIVE',
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
  id: string;
  name: string;
  url: string;
  type: string;
  status: AssetStatusEnum;
  user: IUser;
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
