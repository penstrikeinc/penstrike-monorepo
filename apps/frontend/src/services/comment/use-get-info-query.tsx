import { useQuery } from '@tanstack/react-query';
import { IFinding, SingleResponseFe } from 'src/types';
import { useAxios } from '../use-axios';
import { ENTITY } from './entity';

export const getCommentInfoQueryKey = (commentId: string) => [ENTITY, commentId];

export const useGetCommentInfoQuery = (commentId: string) => {
  const { axios } = useAxios();

  return useQuery<SingleResponseFe<IFinding>>({
    queryKey: getCommentInfoQueryKey(commentId),
    queryFn: () => axios.get(`${ENTITY}/${commentId}`),
    enabled: !!commentId,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
