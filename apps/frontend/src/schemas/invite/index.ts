import { object, z } from 'zod';

export const inviteSchema = object({
  firstName: z.string().min(1, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
  email: z.string().email('Email must be a valid email address'),
});

export type TInvite = z.infer<typeof inviteSchema>;

export const inviteDefaultValues: TInvite = {
  firstName: '',
  lastName: '',
  email: '',
};
