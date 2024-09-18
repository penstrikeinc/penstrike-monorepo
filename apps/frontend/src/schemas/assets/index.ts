import { object, string, z } from 'zod';

export const assetSchema = object({
  assetsName: string().min(1, 'Assets Name is Required'),
  targetUrl: string().min(1, 'Target url is Required'),
});

export type TAsset = z.infer<typeof assetSchema>;

export const assetsDefaultValues: TAsset = {
  assetsName: '',
  targetUrl: '',
};
