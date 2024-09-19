export interface PageableResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
}

export interface PageableResponseFe<T> {
  data: {
    items: T[];
    meta: {
      total: number;
      page: number;
      perPage: number;
    };
  };
}

export interface NonPageableResponseFe<T> {
  status: number;
  data: T[];
}

export interface SingleResponseFe<T> {
  data: T;
}
