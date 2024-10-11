import { UseFormReturn } from 'react-hook-form';
import { BaseSyntheticEvent, FC } from 'react';
import { TAssets } from 'src/schemas';

export interface StepComponentProps extends Omit<StickyFooterProps, 'onSave'> {
  onSubmitHandler: (data: any) => Promise<void>;
  methods: UseFormReturn<TAssets>;
  disabledFields?: string[];
  isEditMode?: boolean;
}

export interface IStep {
  component: FC<StepComponentProps>;
  label: string;
  state: string;
  order: number;
}

export interface StickyFooterProps {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
  steps: IStep[];
  onSave: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  isDisabled?: boolean;
  isMutationLoading?: boolean;
}
export interface ICompletedStateProps {
  [k: number]: boolean;
}
