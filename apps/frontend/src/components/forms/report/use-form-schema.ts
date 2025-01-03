import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { reportDefaultValues, reportSchemaFE, TReportFE } from 'src/schemas';

export const useReportFormSchema = () => {
  const methods = useForm<TReportFE>({
    resolver: zodResolver(reportSchemaFE),
    defaultValues: reportDefaultValues,
    mode: 'all',
  });

  return { methods };
};
