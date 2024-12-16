import { debounce } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type SearchParamFilters = Record<string, any>;

type onSearch = (filters: SearchParamFilters) => void;

export const useSetSearchParams = (initialFilters: SearchParamFilters, onSearch?: onSearch) => {
  const [filters, setFilters] = useState(initialFilters);
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { push } = useRouter();

  const debouncedSearch = useMemo(
    () =>
      debounce((_filters: SearchParamFilters) => {
        // onSearch ? onSearch(filters) :  () => ;
      }, 300),
    []
  );

  const transformFilterUrl = useCallback(
    (filter: SearchParamFilters) => {
      const existingFilters: Record<string, any>[] = [];
      Object.entries(filter).forEach((item) => {
        if (item[1]) {
          existingFilters.push(item);
        }
      });

      const queryFilters = existingFilters.map((item) => [...(item as any)].join('='));

      if (queryFilters.length) {
        const url = `${pathname}?${queryFilters.join('&')}`;
        push(url);
        return;
      }

      push(pathname);
    },
    [pathname, push]
  );

  const patchFilter = useCallback(
    (partial: Partial<SearchParamFilters>) => {
      const newFilters = {
        ...filters,
        ...partial,
      };
      transformFilterUrl(newFilters);
    },
    [filters, transformFilterUrl]
  );

  const resetFilters = useCallback(
    ({ type }: { type?: string } = {}) => {
      const newFilters = {
        ...initialFilters,
        type,
      };
      transformFilterUrl(newFilters);
    },
    [initialFilters, transformFilterUrl]
  );

  const removeFilter = useCallback(
    (filterName: string) => {
      const newFilters = {
        ...filters,
      };

      delete newFilters[filterName];

      transformFilterUrl(newFilters);
    },
    [filters, transformFilterUrl]
  );

  useEffect(() => {
    const updatedFilters = Object.entries(initialFilters).reduce(
      (acc: SearchParamFilters, current) => {
        const [paramKey] = current;

        const value = searchParams.get(paramKey);
        if (paramKey && !!value) {
          acc[paramKey] = value;
        }

        return acc;
      },
      {}
    );

    setFilters(updatedFilters);
    debouncedSearch(updatedFilters);
  }, [debouncedSearch, initialFilters, searchParams]);

  return { patchFilter, removeFilter, resetFilters, filters };
};
