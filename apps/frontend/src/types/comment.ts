import { IPentest } from './pentest';
import { IUser } from './user';

export interface IComment {
  id: string;
  massage: string;
  user: IUser;
  pentest: IPentest;
  createdAt: string;
  updatedAt: string;
}
