import { useQuery } from '@tanstack/react-query';
import { PageableResponseFe } from 'src/types';
import { TReportSingle } from 'src/schemas';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

export const getReportQueryKey = () => [ENTITY];

export const useGetAllReportQuery = () => {
  const { axios } = useAxios();

  return useQuery<PageableResponseFe<TReportSingle>>({
    queryKey: getReportQueryKey(),
    queryFn: () => axios.get(ENTITY),
    refetchOnWindowFocus: false,
  });
};
