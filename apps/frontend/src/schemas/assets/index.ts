import { array, object, string, z } from 'zod';

enum AssetStatus {
  ACTIVE = 'ACTIVE',
  UNDER_REVIEW = 'UNDER_REVIEW',
  INACTIVE = 'INACTIVE',
}

export const assetSchema = object({
  name: string().min(1, 'Asset Name is Required'),
  url: string().min(1, 'Target url is Required'),
  type: string().optional().default('Web Application'),
  status: string().optional().default(AssetStatus.ACTIVE),
});

export const assetsSchema = object({
  assets: array(assetSchema),
});

export type TAsset = z.infer<typeof assetSchema>;
export type TAssets = z.infer<typeof assetsSchema>;

export const assetDefaultValues: TAsset = {
  name: '',
  url: '',
  type: 'Web Application',
  status: AssetStatus.ACTIVE,
};

export const assetsDefaultValues: TAssets = {
  assets: [assetDefaultValues],
};
