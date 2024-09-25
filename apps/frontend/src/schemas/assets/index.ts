import { array, object, string, z } from 'zod';

export const assetSchema = object({
  assetsName: string().min(1, 'Assets Name is Required'),
  targetUrl: string().min(1, 'Target url is Required'),
});

export const assetsSchema = object({
  assets: array(assetSchema),
});

export type TAsset = z.infer<typeof assetSchema>;
export type TAssets = z.infer<typeof assetsSchema>;

export const assetDefaultValues: TAsset = {
  assetsName: '',
  targetUrl: '',
};

export const assetsDefaultValues: TAssets = {
  assets: [assetDefaultValues],
};
