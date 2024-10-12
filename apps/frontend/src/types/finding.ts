import { z } from 'zod';
import { IUser } from './user';
import { IPentest } from './pentest';

export enum FindingStateEnum {
  PENDING_FIX = 'PENDING_FIX',
  READY_FOR_PENTEST = 'READY_FOR_PENTEST',
  FIXED = 'FIXED',
  TRIAGING = 'TRIAGING',
  CARRIED_OVER = 'CARRIED_OVER',
}

export const SeverityTypeEnumObject = z.enum(['HIGH', 'LOW', 'MEDIUM', 'CRITICAL']);

export const CategoryTypeEnumObject = z.enum([
  'CWE_991',
  'CWE_991',
  'CWE_991',
  'CWE_991',
  'CWE_991',
]);

export const SeverityEnum = SeverityTypeEnumObject.enum;
export const CategoryEnum = CategoryTypeEnumObject.enum;
export type TCategoryEnum = z.infer<typeof CategoryTypeEnumObject>;
export type TSeverityEnum = z.infer<typeof SeverityTypeEnumObject>;

export interface IFinding {
  id: string;
  name: string;
  description: string;
  host: string;
  note: string;
  impact: string;
  state: FindingStateEnum;
  severity: TSeverityEnum;
  category: TCategoryEnum;
  user: IUser;
  reproduce: string;
  concept: string;
  pentest: IPentest;
  createdAt: string;
  updatedAt: string;
}
