import { object, z } from 'zod';
import { DropdownSchemaFE } from '../finding';

export const reportSchema = object({
  pentest: DropdownSchemaFE,
});

export type TReport = z.infer<typeof reportSchema>;

export const reportDefaultValues: TReport = {
  pentest: { value: '', label: '' },
};
