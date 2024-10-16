import { useQuery } from '@tanstack/react-query';
import { IComment, PageableResponseFe } from 'src/types';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

interface IParams {
  findingId: string;
  parentId?: string;
}

export const getCommentQueryKey = (params: IParams) => [ENTITY, params];

export const useGetCommentsQuery = (params: IParams) => {
  const { axios } = useAxios();

  return useQuery<PageableResponseFe<IComment>>({
    queryKey: getCommentQueryKey(params),
    queryFn: () => axios.get(ENTITY, { params }),
    refetchOnWindowFocus: false,
  });
};
