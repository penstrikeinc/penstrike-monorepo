import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { JwtReturnType } from 'src/types';
import { PENSTRIKE_USER_KEY } from 'src/config-global';
import { useAxios } from '../use-axios';
import { ENTITY } from './entity';

export const useLoginMutation = () => {
  // const { update } = useLocalStorage(PENSTRIKE_USER_KEY, null);
  const { axios } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const mutationFn = useCallback(
    async (params: { email: string; password: string }) =>
      axios.post(`${ENTITY}/login`, params, { timeout: 10000 }),
    [axios]
  );

  return useMutation({
    mutationFn,
    onSuccess: (res) => {
      // update(PENSTRIKE_USER_KEY, res.data);
      enqueueSnackbar('Email Login successful!', {
        variant: 'success',
      });
    },
  });
};
