import { useQuery } from '@tanstack/react-query';
import { IFinding, PageableResponseFe } from 'src/types';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

export const getFindingQueryKey = () => [ENTITY];

export const useGetAllFindingQuery = () => {
  const { axios } = useAxios();

  return useQuery<PageableResponseFe<IFinding>>({
    queryKey: getFindingQueryKey(),
    queryFn: () => axios.get(ENTITY),
    refetchOnWindowFocus: false,
  });
};
