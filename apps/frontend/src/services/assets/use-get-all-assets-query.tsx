import { useQuery } from '@tanstack/react-query';
import { NonPageableResponseFe } from 'src/types';
import { TAsset } from 'src/schemas';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

export const getUsersQueryKey = () => [ENTITY];

export const useGetAllUsersQuery = () => {
  const { axios } = useAxios();

  return useQuery<NonPageableResponseFe<TAsset>>({
    queryKey: getUsersQueryKey(),
    queryFn: () => axios.get(ENTITY),
    refetchOnWindowFocus: false,
  });
};
