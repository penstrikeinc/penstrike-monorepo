import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useEffect } from 'react';
import { useAssetsFormSchema } from 'src/components/forms';
import { assetsDefaultValues, TAssets } from 'src/schemas/assets';
import { ICompletedStateProps } from './step-components/type';

export interface IParams {
  isEditMode: boolean;
  onClose: () => void;
  context: TAssets | null;
  onError?: (error: unknown) => void;
  activeStep: number;
  completed: ICompletedStateProps;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setCompleted: Dispatch<SetStateAction<ICompletedStateProps>>;
}

export const useAddEditAssetsFunctionality = (params: IParams) => {
  const {
    isEditMode,
    context,
    onClose,
    onError,
    activeStep,
    completed,
    setActiveStep,
    setCompleted,
  } = params;
  const { methods } = useAssetsFormSchema();

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isValid },
  } = methods;

  const isMutationLoading = false;
  const isDisabled = Boolean(!isValid);

  const onCloseHandler = useCallback(() => {
    reset(assetsDefaultValues);
    setActiveStep(0);
    setCompleted({});
    onClose();
  }, [onClose, reset, setActiveStep, setCompleted]);

  const handleComplete = useCallback(() => {
    const newCompleted = completed;

    if (isValid) {
      newCompleted[0] = true;
    }
    if (isValid) {
      newCompleted[1] = true;
    }
    if (!isDisabled) {
      newCompleted[0] = true;
      newCompleted[1] = true;
    }

    setCompleted(newCompleted);
  }, [completed, isDisabled, isValid, setCompleted]);

  useEffect(() => {
    if (isEditMode) {
      handleComplete();
    }
    // else if (isErrorsForm) {
    //   handleComplete();
    // }
  }, [handleComplete, isEditMode]);

  const onUpdateCategorySubmit = useCallback(async (data: TAssets) => {
    console.log({ data });
  }, []);

  const onCreateCategorySubmit = useCallback(async (data: TAssets) => {
    console.log({ data });
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep(activeStep + 1);
    handleComplete();
  }, [activeStep, handleComplete, setActiveStep]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    handleComplete();
  }, [handleComplete, setActiveStep]);

  const handleStep = useCallback(
    (step: number) => () => {
      if (step !== 1 || isEditMode || !isDisabled) {
        setActiveStep(step);
      } else {
        // Swal.fire({
        //   title: t('alert.dialog_incomplete_step.title'),
        //   text: t('alert.dialog_incomplete_step.description'),
        //   showConfirmButton: false,
        // });
      }
      handleComplete();
    },
    [handleComplete, isDisabled, isEditMode, setActiveStep]
  );

  const onCloseDialogHandler = useCallback(
    (_event: MouseEventHandler<HTMLButtonElement>, reason: 'escapeKeyDown' | 'backdropClick') => {
      if (reason === 'backdropClick') {
        return;
      }
      onCloseHandler();
    },
    [onCloseHandler]
  );

  useEffect(() => {
    reset(context || assetsDefaultValues);
  }, [context, reset, setValue]);

  const onSubmit = isEditMode ? onUpdateCategorySubmit : onCreateCategorySubmit;

  return {
    onSubmit: handleSubmit(onSubmit),
    onCloseDialogHandler,
    onCloseHandler,
    methods,
    handleBack,
    handleNext,
    handleStep,
    isDisabled,
    isMutationLoading,
  };
};
