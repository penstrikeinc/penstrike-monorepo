import { useQuery } from '@tanstack/react-query';
import { IUser, PageableResponseFe } from 'src/types';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

export const getUserQueryKey = () => [ENTITY];

export const useGetAllUserQuery = () => {
  const { axios } = useAxios();

  return useQuery<PageableResponseFe<IUser>>({
    queryKey: getUserQueryKey(),
    queryFn: () => axios.get(ENTITY),
    refetchOnWindowFocus: false,
  });
};
