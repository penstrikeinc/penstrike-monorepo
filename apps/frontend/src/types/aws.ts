export interface IGenerateAwsS3URL {
  id: string;
  type: string;
  destination: string;
  fileName: string;
  userId: string;
  companyId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IGenerateAwsS3URLResponse {
  status: string;
  value: IGenerateAwsS3URL;
}
