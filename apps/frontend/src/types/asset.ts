import { IUser } from './user';

export enum AssetStatusEnum {
  ACTIVE = 'ACTIVE',
  UNDER_REVIEW = 'UNDER_REVIEW',
  INACTIVE = 'INACTIVE',
}

export interface IAsset {
  id: string;
  name: string;
  url: string;
  type: string;
  status: AssetStatusEnum;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
