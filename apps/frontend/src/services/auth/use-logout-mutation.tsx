import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useAxios } from '../use-axios';
import { ENTITY } from './entity';

export const useLogoutMutation = () => {
  const { axios } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const mutationFn = useCallback(async () => axios.post(`${ENTITY}/logout`), [axios]);

  return useMutation({
    mutationFn,
    onSuccess: () => {
      enqueueSnackbar('Email Logout successful!', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Email Logout failed!', {
        variant: 'error',
      });
    },
  });
};
