import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { inviteDefaultValues, inviteSchema, TInvite } from 'src/schemas';

export const useInviteFormSchema = () => {
  const methods = useForm<TInvite>({
    resolver: zodResolver(inviteSchema),
    defaultValues: inviteDefaultValues,
    mode: 'all',
  });

  return { methods };
};
