import { useQuery } from '@tanstack/react-query';
import { IUser } from 'src/types';
import { useAxios } from '../use-axios';
import { ENTITY } from './entity';

export const getProfileQueryKey = () => [ENTITY, 'profile'];

export const useGetProfileQuery = () => {
  const { axios } = useAxios();

  return useQuery<IUser>({
    queryKey: getProfileQueryKey(),
    queryFn: () => axios.get(`${ENTITY}/profile`),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
