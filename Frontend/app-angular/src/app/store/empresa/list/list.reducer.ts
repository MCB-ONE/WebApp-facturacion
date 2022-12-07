import { createReducer, on } from '@ngrx/store';
import { HttpParams } from "@angular/common/http";
import { Pagination } from './list.models';
import { ListActions } from './list.actions';



export interface ListState {
  pagination: Pagination | null;
  requestPagination: HttpParams | null;
  loading: boolean | null;
  error: string | null;
}

export const initialState: ListState = {
  pagination: null,
  requestPagination: null,
  loading: null,
  error: null
}


export const listReducer = createReducer(
  initialState,
  on(ListActions.readAllStart, (state, { requestPagination }) => {
    return {
      ...state,
      loading: true,
      error: null,
      requestPagination: requestPagination
    }
  }),
  on(ListActions.readAllSuccess, (state, { pagination }) => {
    return {
      ...state,
      loading: false,
      pagination: pagination,
      error: null
    }
  }),
  on(ListActions.readAllError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error
    }
  })
)
