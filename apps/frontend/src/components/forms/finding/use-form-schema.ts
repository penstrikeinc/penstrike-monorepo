import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { findingDefaultValues, findingSchema, TFinding } from 'src/schemas';

export const useFindingFormSchema = () => {
  const methods = useForm<TFinding>({
    resolver: zodResolver(findingSchema),
    defaultValues: findingDefaultValues,
    mode: 'all',
  });

  return { methods };
};
