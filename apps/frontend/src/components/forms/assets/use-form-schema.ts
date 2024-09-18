import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { assetSchema, assetsDefaultValues, TAsset } from 'src/schemas/assets';

export const useAssetsFormSchema = () => {
  const methods = useForm<TAsset>({
    resolver: zodResolver(assetSchema),
    defaultValues: assetsDefaultValues,
    mode: 'all',
  });

  return { methods };
};
