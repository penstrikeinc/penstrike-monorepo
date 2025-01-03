import { object, string, z } from 'zod';
import { IPentest } from 'src/types';
import { DropdownSchemaFE } from '../finding';
import { attachmentSchema } from '../attachment';

export const reportSchema = object({
  id: string().min(1, 'id is required'),
  pentest: DropdownSchemaFE,
  reportFile: attachmentSchema,
  createdAt: string().min(1, 'created at is required'),
  updatedAt: string().min(1, 'updated at is required'),
});

export const reportSchemaFE = reportSchema.omit({
  id: true,
  reportFile: true,
  createdAt: true,
  updatedAt: true,
});

export const reportSchemaBE = reportSchemaFE
  .omit({
    pentest: true,
  })
  .extend({
    pentest: z.string().min(1, 'Pentest is required'),
    attachment: z.string().min(1, 'Attachment is required'),
  });

export type TReport = z.infer<typeof reportSchema>;
export type TReportSingle = Omit<TReport, 'pentest'> & {
  pentest: IPentest;
};

export type TReportFE = z.infer<typeof reportSchemaFE>;
export type TReportBE = z.infer<typeof reportSchemaBE>;

export const reportDefaultValues: TReportFE = {
  pentest: { value: '', label: '' },
};
