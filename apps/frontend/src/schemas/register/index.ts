import { object, z } from 'zod';

export const RegisterSchema = object({
  firstName: z.string().min(1, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
  email: z.string().email('Email must be a valid email address'),
  password: z.string().min(1, 'Password is required'),
  active: z.boolean().optional(),
});

export type TRegister = z.infer<typeof RegisterSchema>;

export const registerDefaultValues: TRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  active: false,
};
