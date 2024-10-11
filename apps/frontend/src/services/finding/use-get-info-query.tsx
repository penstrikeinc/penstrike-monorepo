import { useQuery } from '@tanstack/react-query';
import { IPentest, SingleResponseFe } from 'src/types';
import { useAxios } from '../use-axios';
import { ENTITY } from './entity';

export const getFindingInfoQueryKey = (findingId: string) => [ENTITY, findingId];

export const useGetFindingInfoQuery = (findingId: string) => {
  const { axios } = useAxios();

  return useQuery<SingleResponseFe<IPentest>>({
    queryKey: getFindingInfoQueryKey(findingId),
    queryFn: () => axios.get(`${ENTITY}/${findingId}`),
    enabled: !!findingId,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
