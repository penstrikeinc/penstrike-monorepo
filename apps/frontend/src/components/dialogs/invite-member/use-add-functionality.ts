import { MouseEventHandler, useCallback } from 'react';
import { useInviteFormSchema } from 'src/components/forms';
import { inviteDefaultValues, TInvite } from 'src/schemas';
import { useCreateAssetMutation } from 'src/services';

export interface IParams {
  onClose: () => void;
  onError?: (error: unknown) => void;
}

export const useInviteMemberFunctionality = (params: IParams) => {
  const { onClose, onError } = params;
  const { methods } = useInviteFormSchema();
  const { mutateAsync: createAsset } = useCreateAssetMutation();

  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = methods;

  const isMutationLoading = false;
  const isDisabled = Boolean(!isValid || !isDirty);

  const onCloseHandler = useCallback(() => {
    reset(inviteDefaultValues);
    onClose();
  }, [onClose, reset]);

  const onCreateAssetSubmit = useCallback(async (data: TInvite) => {
    console.log({ data });
    // createAsset(assets, {
    //   onSuccess: (res) => {
    //     onCloseHandler();
    //   },
    //   onError: (error) => {
    //     if (onError) {
    //       onError(error);
    //     }
    //   },
    // });
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

  return {
    onSubmit: handleSubmit(onCreateAssetSubmit),
    onCloseDialogHandler,
    onCloseHandler,
    methods,
    isDisabled,
    isMutationLoading,
  };
};
