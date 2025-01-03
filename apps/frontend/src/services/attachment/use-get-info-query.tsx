import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../use-axios';
import { ENTITY } from './entity';

export const getAttachmentInfoQueryKey = (fileName: string) => [ENTITY, fileName];

export const useGetAttachmentInfoQuery = (fileName: string) => {
  const { axios } = useAxios();

  return useQuery({
    queryKey: getAttachmentInfoQueryKey(fileName),
    queryFn: async () => {
      const res = await axios.get(`${ENTITY}/report/${fileName}`);
      console.log({ res });
      return res;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
