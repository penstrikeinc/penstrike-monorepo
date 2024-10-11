import { FC, memo, useCallback } from 'react';
import { FindingForm } from 'src/components/forms';
import { FormProvider } from 'src/components/hook-form';
import { StepComponentProps } from './type';

export const FindingInfo: FC<StepComponentProps> = memo((props: StepComponentProps) => {
  const { methods } = props;
  const { handleSubmit } = methods;
  const onSubmit = useCallback(() => {}, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FindingForm />
    </FormProvider>
  );
});
