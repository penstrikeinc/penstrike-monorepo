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

export enum PentestStatusEnum {
  SETUP = 'SETUP',
  TESTING = 'TESTING',
  COMPLETE = 'COMPLETE',
  RETESTING = 'RETESTING',
  SCOPING = 'SCOPING',
}

export enum UserTypeEnum {
  CUSTOMER = 'CUSTOMER',
  PENTESTER = 'PENTESTER',
  ADMIN = 'ADMIN',
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  userType: UserTypeEnum;
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
  impact: string;
  state: FindingStateEnum;
  severity: SeverityEnum;
  category: CategoryEnum;
  reproduce: string;
  concept: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
