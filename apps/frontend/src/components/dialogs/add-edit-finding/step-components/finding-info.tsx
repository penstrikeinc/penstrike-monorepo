import { FC, memo } from 'react';
import { FindingForm } from 'src/components/forms';
import { FormProvider } from 'src/components/hook-form';
import { StepComponentProps } from './type';

export const FindingInfo: FC<StepComponentProps> = memo((props: StepComponentProps) => {
  const { methods, onSubmitHandler } = props;
  const { handleSubmit } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitHandler)}>
      <FindingForm />
    </FormProvider>
  );
});
