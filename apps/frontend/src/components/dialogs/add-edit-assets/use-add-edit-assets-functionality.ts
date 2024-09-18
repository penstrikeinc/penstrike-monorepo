import { MouseEventHandler, useCallback, useEffect } from 'react';
import { useAssetsFormSchema } from 'src/components/forms';

import { assetsDefaultValues, TAsset } from 'src/schemas/assets';
// import { useAssetsFormSchema } from 'src/components/forms';

export interface IParams {
  isEditMode: boolean;
  onClose: () => void;
  context: TAsset | null;
  onError?: (error: unknown) => void;
}

export const useAddEditAssetsFunctionality = (params: IParams) => {
  const { isEditMode, context, onClose, onError } = params;
  const { methods } = useAssetsFormSchema();

  const { handleSubmit, setValue, reset } = methods;

  const onCloseHandler = useCallback(() => {
    reset(assetsDefaultValues);
    onClose();
  }, [onClose, reset]);

  const onUpdateCategorySubmit = useCallback(async (data: TAsset) => {
    console.log({ data });
  }, []);

  const onCreateCategorySubmit = useCallback(async (data: TAsset) => {
    console.log({ data });
  }, []);

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
  };
};
