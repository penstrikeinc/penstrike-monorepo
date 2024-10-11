import { object, string, z } from 'zod';

enum AssetStatus {
  ACTIVE = 'ACTIVE',
  UNDER_REVIEW = 'UNDER_REVIEW',
  INACTIVE = 'INACTIVE',
}

export const findingSchema = object({
  name: string().min(1, 'Finding Name is Required'),
  host: string().min(1, 'Host url is Required'),
  note: string().optional(),
  description: string().min(1, 'description is Required'),
  impact: string().min(1, 'impact is Required'),
  status: string().optional().default(AssetStatus.ACTIVE),
});

export type TFinding = z.infer<typeof findingSchema>;

export const findingDefaultValues: TFinding = {
  name: '',
  host: '',
  note: '',
  description: '',
  impact: '',
  status: AssetStatus.ACTIVE,
};
