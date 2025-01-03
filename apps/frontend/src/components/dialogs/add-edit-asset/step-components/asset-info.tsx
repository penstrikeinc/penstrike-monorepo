import { FC, memo, useCallback } from 'react';
import { AssetForm } from 'src/components/forms';
import { FormProvider } from 'src/components/hook-form';
import { StepComponentProps } from './type';

export const AssetInfo: FC<StepComponentProps> = memo((props: StepComponentProps) => {
  const { methods, isEditMode } = props;
  const { handleSubmit } = methods;
  const onSubmit = useCallback(() => {}, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <AssetForm methods={methods} isEditMode={isEditMode} />
    </FormProvider>
  );
});
