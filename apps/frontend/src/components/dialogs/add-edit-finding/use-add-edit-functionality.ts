import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useEffect } from 'react';
import { useFindingFormSchema } from 'src/components/forms';
import { useCreateFindingMutation } from 'src/services';
import { IAsset } from 'src/types';
import { findingDefaultValues, TFinding } from 'src/schemas';
import { ICompletedStateProps } from './step-components/type';

export interface IParams {
  isEditMode: boolean;
  onClose: () => void;
  context: IAsset | null;
  onError?: (error: unknown) => void;
  activeStep: number;
  completed: ICompletedStateProps;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setCompleted: Dispatch<SetStateAction<ICompletedStateProps>>;
}

export const useAddEditFindingFunctionality = (params: IParams) => {
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
  const { methods } = useFindingFormSchema();
  const { mutateAsync: createFinding } = useCreateFindingMutation();

  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = methods;

  const isMutationLoading = false;
  const isDisabled = Boolean(!isValid || !isDirty);

  const onCloseHandler = useCallback(() => {
    reset(findingDefaultValues);
    setActiveStep(0);
    setCompleted({});
    onClose();
  }, [onClose, reset, setActiveStep, setCompleted]);

  const handleComplete = useCallback(() => {
    const newCompleted = completed;

    if (isValid) {
      newCompleted[0] = true;
      newCompleted[1] = true;
    }
    if (!isDisabled) {
      newCompleted[0] = true;
      newCompleted[1] = true;
    }

    setCompleted(newCompleted);
  }, [completed, isDisabled, isValid, setCompleted]);

  const onUpdateSubmit = useCallback(async (data: TFinding) => {
    // const { assets } = data;
    // updateAsset(
    //   { assetId, payload: assets[0] },
    //   {
    //     onSuccess: (res) => {
    //       onCloseHandler();
    //     },
    //     onError: (error) => {
    //       if (onError) {
    //         onError(error);
    //       }
    //     },
    //   }
    // );
  }, []);

  const onCreateSubmit = useCallback(
    async (data: TFinding) => {
      const payload = {
        ...data,
        category: data.category.value,
        severity: data.severity.value,
        pentest: data.pentest.value,
      };

      createFinding(
        { payload },
        {
          onSuccess: (res) => {
            onCloseHandler();
          },
          onError: (error) => {
            if (onError) {
              onError(error);
            }
          },
        }
      );
    },
    [createFinding, onCloseHandler, onError]
  );

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
    // reset(context);
  }, [context, reset]);

  const onSubmit = isEditMode ? onUpdateSubmit : onCreateSubmit;

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
