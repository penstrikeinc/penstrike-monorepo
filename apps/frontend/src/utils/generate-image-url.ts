import { IGenerateAwsS3URL } from 'src/types';

export const generateImageUrl = ({ src }: { src: IGenerateAwsS3URL }): string => {
  const { destination, fileName } = src;
  // eslint-disable-next-line no-template-curly-in-string
  return '`https://${bucket}.${awsEndpoint}/${destination}/${fileName}`';
};
