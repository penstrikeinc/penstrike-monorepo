// import { debounce, SelectChangeEvent } from '@mui/material';
// import { subDays } from 'date-fns';
// import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useState } from 'react';
// import { z } from 'zod';
// import { useRouter } from 'next/router';
// import { useSetSearchParams } from 'src/hooks';

// export interface IOrdersFilters {
//   from?: string;
//   to?: string;
//   page?: number;
//   perPage?: number;
//   range?: string;
//   inventoryId?: string;
//   reason?: string;
//   orderStatus?: string;
//   paymentStatus?: string;
//   customerId?: string;
//   orderId?: string;
//   userId?: string;
// }

// export const historyFilterDefaultValues: IOrdersFilters = {
//   inventoryId: undefined,
//   from: undefined,
//   to: undefined,
//   page: undefined,
//   perPage: undefined,
//   range: undefined,
//   orderStatus: undefined,
//   paymentStatus: undefined,
//   customerId: undefined,
//   orderId: undefined,
//   userId: undefined,
// };

// export const useOrderHistoryMethods = () => {
//   const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
//   const { patchFilter, filters } = useSetSearchParams(historyFilterDefaultValues);
//   const { pathname, push } = useRouter();

//   useEffect(() => {
//     const hasActiveFilter = !!Object.values(filters).filter((f) => f).length;
//     setIsFilterActive(hasActiveFilter);
//   }, [filters]);

//   const handleFromDateChange = useCallback(
//     (value: Date | null) => {
//       const isSuccess = z.date().safeParse(value).success;
//       if (!isSuccess || !value) return patchFilter({ ...filters, from: undefined });

//       const date = new Date(value).toISOString().split('T')[0];

//       return patchFilter({ ...filters, from: date });
//     },
//     [filters, patchFilter]
//   );

//   const handleToDateChange = useCallback(
//     (value: Date | null) => {
//       const isSuccess = z.date().safeParse(value).success;
//       if (!value || !isSuccess) return patchFilter({ ...filters, to: undefined });

//       const date = new Date(value).toISOString().split('T')[0];

//       return patchFilter({ ...filters, to: date });
//     },
//     [filters, patchFilter]
//   );

//   const handleChangeOrderStatus = useCallback(
//     (event: SelectChangeEvent<string>) => {
//       const orderStatus = event.target.value;
//       if (orderStatus) {
//         return patchFilter({ ...filters, orderStatus });
//       }
//     },
//     [filters, patchFilter]
//   );

//   const handleChangePaymentStatus = useCallback(
//     (event: SelectChangeEvent<string>) => {
//       const paymentStatus = event.target.value;
//       if (paymentStatus) {
//         return patchFilter({ ...filters, paymentStatus });
//       }
//     },
//     [filters, patchFilter]
//   );

//   const handleRangePatchFilter = useCallback(
//     ({ fromDate, toDate, value }: { fromDate: Date; toDate: Date; value: string }) => {
//       const to = new Date(toDate).toISOString().split('T')[0];
//       const from = new Date(fromDate).toISOString().split('T')[0];
//       patchFilter({
//         from,
//         to,
//         range: value,
//       });
//     },
//     [patchFilter]
//   );

//   const handleRangeChange = useCallback(
//     (event: SelectChangeEvent<string>) => {
//       const value = event.target.value;

//       if (value === 'TODAY') {
//         return handleRangePatchFilter({ fromDate: new Date(), toDate: new Date(), value });
//       }

//       if (value === 'YESTERDAY') {
//         return handleRangePatchFilter({
//           fromDate: subDays(new Date(), 1),
//           toDate: subDays(new Date(), 1),
//           value,
//         });
//       }

//       if (typeof value === 'number') {
//         handleRangePatchFilter({ fromDate: subDays(new Date(), value), toDate: new Date(), value });
//       }
//     },
//     [handleRangePatchFilter]
//   );

//   const handleUserChange = useCallback(
//     (user: IUser | null) => {
//       if (user) {
//         patchFilter({ ...filters, userId: user.id });
//       }
//     },
//     [filters, patchFilter]
//   );

//   const handleCustomerChange = useCallback(
//     (customer: TCustomer | null) => {
//       if (customer) {
//         patchFilter({ ...filters, customerId: customer.id });
//       }
//     },
//     [filters, patchFilter]
//   );

//   const setDebouncedSearchOrderId = debounce((orderId) => {
//     patchFilter({ ...filters, orderId });
//   }, 500);

//   const handleSearchOrderId: ChangeEventHandler<HTMLInputElement> = useCallback(
//     (event) => {
//       const orderId = event.target.value;
//       setDebouncedSearchOrderId(orderId);
//     },
//     [setDebouncedSearchOrderId]
//   );

//   const handleResetFilter = useCallback(() => {
//     push(pathname);
//   }, [pathname, push]);

//   const handleChangePage = useCallback(
//     (_: ChangeEvent<unknown>, pageNumber: number) => {
//       patchFilter({ ...filters, page: pageNumber });
//     },
//     [filters, patchFilter]
//   );

//   return {
//     filters,
//     isFilterActive,
//     handleChangePage,
//     handleFromDateChange,
//     handleRangeChange,
//     handleResetFilter,
//     handleToDateChange,
//     handleChangeOrderStatus,
//     handleChangePaymentStatus,
//     handleCustomerChange,
//     handleSearchOrderId,
//     handleUserChange,
//   };
// };
