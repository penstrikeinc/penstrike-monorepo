import { useQuery } from '@tanstack/react-query';
import { NonPageableResponseFe } from 'src/types';
import { IAsset } from 'src/types/asset';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

export const getUsersQueryKey = () => [ENTITY];

export const useGetAllUsersQuery = () => {
  const { axios } = useAxios();

  return useQuery<NonPageableResponseFe<IAsset>>({
    queryKey: getUsersQueryKey(),
    queryFn: () => axios.get(ENTITY),
    refetchOnWindowFocus: false,
  });
};