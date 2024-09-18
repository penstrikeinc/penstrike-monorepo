import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerDefaultValues, RegisterSchema, TRegister } from 'src/schemas';

export const useRegisterFormSchema = () => {
  const methods = useForm<TRegister>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: registerDefaultValues,
    mode: 'all',
  });

  return { methods };
};
