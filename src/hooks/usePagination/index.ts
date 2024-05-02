import type { QueryKey } from '@tanstack/react-query';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useMemoizedFn } from 'ahooks';
import { isEqual } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';

// import useMemoizedFn from '../useMemoizedFn';
// import useRequest from '../useRequest';
export declare type QueryFunction<T = unknown> = (param: {
  pageSize: number;
  current: number;
}) => T | Promise<T>;

const usePagination = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'initialData' | 'queryFn'
  > & {
    initialData?: () => undefined;
    defaultPageSize?: number;
    defaultCurrent?: number;
    queryFn: QueryFunction<TQueryFnData>;
  },
) => {
  const { defaultPageSize = 10, defaultCurrent = 1, queryKey, queryFn, ...rest } = options;
  const [current, setCurrent] = useState(defaultCurrent);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const result = useQuery<{ list: unknown[]; total: number }>({
    queryKey: [...queryKey, current, pageSize],
    queryFn: () => queryFn({ current, pageSize }),
    keepPreviousData: true,
    ...rest,
  });
  // const result = useQuery(
  //   [...queryKey, current, pageSize],
  //   () => queryFn({ current, pageSize }),
  //   { keepPreviousData: true, staleTime: 5 * 1e3 },
  //   // ...rest,
  // );
  //当queryKey改变后要将current重置到第一页
  const previousKeyRef = useRef(queryKey);
  useEffect(() => {
    console.log(queryKey, previousKeyRef.current);
    if (!isEqual(queryKey, previousKeyRef.current)) {
      previousKeyRef.current = queryKey;
      setCurrent(1);
    }
  }, [queryKey]);

  const total = result.data?.total || 0;
  const totalPage = useMemo(() => Math.ceil(total / pageSize), [pageSize, total]);

  const onChange = (c: number, p: number) => {
    let toCurrent = c <= 0 ? 1 : c;
    const toPageSize = p <= 0 ? 1 : p;
    const tempTotalPage = Math.ceil(total / toPageSize);
    if (toCurrent > tempTotalPage) {
      toCurrent = Math.max(1, tempTotalPage);
    }
    setCurrent(c);
    setPageSize(p);
  };

  const changeCurrent = (c: number) => {
    onChange(c, pageSize);
  };

  const changePageSize = (p: number) => {
    onChange(current, p);
  };

  return {
    ...result,
    pagination: {
      current,
      pageSize,
      total,
      totalPage,
      onChange: useMemoizedFn(onChange),
      changeCurrent: useMemoizedFn(changeCurrent),
      changePageSize: useMemoizedFn(changePageSize),
    },
  } as UseQueryResult<TData, TError> & { pagination: any };
};

export default usePagination;
