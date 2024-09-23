import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { JwtReturnType } from 'src/types';
import { useAxios } from '../use-axios';
import { ENTITY } from './entity';

export const useLoginMutation = () => {
  const { axios } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const mutationFn = useCallback(
    async (params: { email: string; password: string }) =>
      axios.post<JwtReturnType>(`${ENTITY}/login`, params, { timeout: 10000 }),
    [axios]
  );

  return useMutation({
    mutationFn,
    onSuccess: (res) => {
      enqueueSnackbar('Email Login successful!', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Email Login failed!', {
        variant: 'error',
      });
    },
  });
};
