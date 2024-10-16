import { IFinding } from './finding';
import { IUser } from './user';

export interface IComment {
  id: string;
  massage: string;
  parentId?: string | null;
  user: IUser;
  finding: IFinding;
  createdAt: string;
  updatedAt: string;
}
