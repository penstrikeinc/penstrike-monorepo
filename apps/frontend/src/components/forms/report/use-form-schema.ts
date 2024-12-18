import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { reportDefaultValues, reportSchema, TReport } from 'src/schemas';

export const useReportFormSchema = () => {
  const methods = useForm<TReport>({
    resolver: zodResolver(reportSchema),
    defaultValues: reportDefaultValues,
    mode: 'all',
  });

  return { methods };
};
