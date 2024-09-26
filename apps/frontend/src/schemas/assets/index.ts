import { array, object, string, z } from 'zod';

export const assetSchema = object({
  assetName: string().min(1, 'Asset Name is Required'),
  targetUrl: string().min(1, 'Target url is Required'),
});

export const assetsSchema = object({
  assets: array(assetSchema),
});

export type TAsset = z.infer<typeof assetSchema>;
export type TAssets = z.infer<typeof assetsSchema>;

export const assetDefaultValues: TAsset = {
  assetName: '',
  targetUrl: '',
};

export const assetsDefaultValues: TAssets = {
  assets: [assetDefaultValues],
};
