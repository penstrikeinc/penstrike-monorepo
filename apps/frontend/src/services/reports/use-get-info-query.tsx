import { useQuery } from '@tanstack/react-query';
import { SingleResponseFe } from 'src/types';
import { TReportSingle } from 'src/schemas';
import { useAxios } from '../use-axios';
import { ENTITY } from './entity';

export const getReportInfoQueryKey = (assetId: string) => [ENTITY, assetId];

export const useGetReportInfoQuery = (assetId: string) => {
  const { axios } = useAxios();

  return useQuery<SingleResponseFe<TReportSingle>>({
    queryKey: getReportInfoQueryKey(assetId),
    queryFn: () => axios.get(`${ENTITY}/${assetId}`),
    enabled: !!assetId,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
