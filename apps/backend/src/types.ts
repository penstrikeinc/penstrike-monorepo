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

export type TConfigService = {
  AUTO_LOAD_ENTITIES: boolean;
  AWS_ACCESS_KEY: string;
  AWS_BUCKET_NAME: string;
  AWS_BUCKET_REGION: string;
  AWS_ENDPOINT: string;
  AWS_SECRET_ACCESS_KEY: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_SYNCHRONIZE: boolean;
  DB_USERNAME: string;
  DEFAULT_PAGE_SIZE: number;
  JWT_SECRET: string;
  JWT_TOKEN_VALIDITY: string;
  PORT: number;
  SMTP_FROM: string;
  SMTP_HOST: string;
  SMTP_PASSWORD: string;
  SMTP_PORT: string;
  SMTP_TRANSPORT?: string;
  SMTP_USER: string;
};

