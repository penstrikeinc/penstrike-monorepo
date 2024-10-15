import { useQuery } from '@tanstack/react-query';
import { IFinding, PageableResponseFe } from 'src/types';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

export const getCommentQueryKey = () => [ENTITY];

export const useGetAllCommentQuery = () => {
  const { axios } = useAxios();

  return useQuery<PageableResponseFe<IFinding>>({
    queryKey: getCommentQueryKey(),
    queryFn: () => axios.get(ENTITY),
    refetchOnWindowFocus: false,
  });
};
