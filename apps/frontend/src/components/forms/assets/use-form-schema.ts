import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { assetsDefaultValues, assetsSchema, TAssets } from 'src/schemas/assets';

export const useAssetsFormSchema = () => {
  const methods = useForm<TAssets>({
    resolver: zodResolver(assetsSchema),
    defaultValues: assetsDefaultValues,
    mode: 'all',
  });

  return { methods };
};
