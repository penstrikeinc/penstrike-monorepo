import { Dispatch, MouseEventHandler, SetStateAction, useCallback } from 'react';
import { useReportFormSchema } from 'src/components/forms';
import { reportDefaultValues, TReportFE } from 'src/schemas';
import { useCreateReportMutation } from 'src/services/reports';
import { IGenerateAwsS3URL } from 'src/types';

export interface IParams {
  onClose: () => void;
  onError?: (error: unknown) => void;
  imageSrc: IGenerateAwsS3URL | null;
  setImageSrc: Dispatch<SetStateAction<IGenerateAwsS3URL | null>>;
}

export const useAddReportFunctionality = (params: IParams) => {
  const { onClose, onError, imageSrc, setImageSrc } = params;
  const { methods } = useReportFormSchema();
  const { mutateAsync: createReport } = useCreateReportMutation();

  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = methods;

  const isMutationLoading = false;
  const isDisabled = Boolean(!isValid || !isDirty);

  const onCloseHandler = useCallback(() => {
    reset(reportDefaultValues);
    onClose();
    setImageSrc(null);
  }, [onClose, reset, setImageSrc]);

  const onCreateAssetSubmit = useCallback(
    async (data: TReportFE) => {
      const payload = {
        pentest: data.pentest.value,
        attachment: imageSrc?.id ?? '',
      };

      createReport(payload, {
        onSuccess: (res) => {
          onCloseHandler();
        },
        onError: (error) => {
          if (onError) {
            onError(error);
          }
        },
      });
    },
    [createReport, imageSrc, onCloseHandler, onError]
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

  return {
    onSubmit: handleSubmit(onCreateAssetSubmit),
    onCloseDialogHandler,
    onCloseHandler,
    methods,
    isDisabled,
    isMutationLoading,
  };
};
