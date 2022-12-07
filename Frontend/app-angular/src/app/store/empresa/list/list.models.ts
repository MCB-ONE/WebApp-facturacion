import { Empresa as DbEmpresa } from '@app/models/backend/empresa';

export interface PaginationRequest{
  pageIndex: number | null;
  pageSize: number | null;
  search: string | null;
  sort: number | null;
}

export interface Pagination{
  pageIndex: number;
  pageSize: number;
  count: number;
  pageCount: number;
  data: any[];
}

