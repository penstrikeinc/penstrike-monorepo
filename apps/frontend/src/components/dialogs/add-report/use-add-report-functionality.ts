import { MouseEventHandler, useCallback } from 'react';
import { useAssetFormSchema } from 'src/components/forms';
import { assetsDefaultValues, TAssets } from 'src/schemas/assets';
import { useCreateAssetMutation } from 'src/services';

export interface IParams {
  onClose: () => void;
  onError?: (error: unknown) => void;
}

export const useAddReportFunctionality = (params: IParams) => {
  const { onClose, onError } = params;
  const { methods } = useAssetFormSchema();
  const { mutateAsync: createAsset } = useCreateAssetMutation();

  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = methods;

  const isMutationLoading = false;
  const isDisabled = Boolean(!isValid || !isDirty);

  const onCloseHandler = useCallback(() => {
    reset(assetsDefaultValues);
    onClose();
  }, [onClose, reset]);

  const onCreateAssetSubmit = useCallback(
    async (data: TAssets) => {
      const { assets } = data;

      createAsset(assets, {
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
    [createAsset, onCloseHandler, onError]
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
