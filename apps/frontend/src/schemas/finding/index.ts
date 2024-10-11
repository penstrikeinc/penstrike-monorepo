import { FindingStateEnum } from 'src/types';
import { object, string, z } from 'zod';

export const DropdownSchemaFE = z.object({
  value: string().min(1, 'value is required'),
  label: string().min(1, 'label is required'),
});

export const findingSchema = object({
  name: string().min(1, 'Finding Name is Required'),
  category: DropdownSchemaFE,
  severity: DropdownSchemaFE,
  pentest: DropdownSchemaFE,
  host: string().min(1, 'Host url is Required'),
  description: string().min(1, 'description is Required'),
  reproduce: string().min(1, 'reproduce is Required'),
  impact: string().min(1, 'impact is Required'),
  concept: string().min(1, 'concept is Required'),
  state: string().optional().default(FindingStateEnum.READY_FOR_PENTEST),
});

export const findingSchemaBE = findingSchema
  .omit({
    category: true,
    severity: true,
    pentest: true,
  })
  .extend({
    category: string().min(1, 'category is Required'),
    severity: string().min(1, 'severity is Required'),
    pentest: string().min(1, 'pentest id is Required'),
  });

export type TFinding = z.infer<typeof findingSchema>;
export type TFindingBE = z.infer<typeof findingSchemaBE>;


export const findingDefaultValues: TFinding = {
  name: '',
  category: { value: '', label: '' },
  severity: { value: '', label: '' },
  pentest: { value: '', label: '' },
  reproduce: '',
  concept: '',
  host: '',
  description: '',
  impact: '',
  state: FindingStateEnum.READY_FOR_PENTEST,
};
