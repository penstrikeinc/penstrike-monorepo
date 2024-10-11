import { IUser } from './user';

export enum FindingStateEnum {
  PENDING_FIX = 'PENDING_FIX',
  READY_FOR_PENTEST = 'READY_FOR_PENTEST',
  FIXED = 'FIXED',
  TRIAGING = 'TRIAGING',
  CARRIED_OVER = 'CARRIED_OVER',
}

export enum SeverityEnum {
  HIGH = 'HIGH',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  CRITICAL = 'CRITICAL',
}

export enum CategoryEnum {
  CWE_991 = 'CWE_991',
  CWE_992 = 'CWE_992',
  CWE_993 = 'CWE_993',
  CWE_994 = 'CWE_994',
  CWE_995 = 'CWE_995',
}

export interface IFinding {
  id: string;
  name: string;
  description: string;
  host: string;
  note: string;
  impact: string;
  state: FindingStateEnum;
  severity: SeverityEnum;
  category: CategoryEnum;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
