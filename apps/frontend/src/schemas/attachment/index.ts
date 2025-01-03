import { object, string, z } from 'zod';

export const attachmentSchema = object({
  id: string().min(1, 'id is required'),
  type: string().min(1, 'type is required'),
  destination: string().min(1, 'destination is required'),
  fileName: string().min(1, 'file name is required'),
  userId: string().min(1, 'user id is required'),
  createdAt: string().min(1, 'created at is required'),
  updatedAt: string().min(1, 'updated at is required'),
});

export type TAttachment = z.infer<typeof attachmentSchema>;
