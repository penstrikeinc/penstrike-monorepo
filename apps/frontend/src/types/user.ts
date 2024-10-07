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
  createdAt: Date;
  updatedAt: Date;
}
