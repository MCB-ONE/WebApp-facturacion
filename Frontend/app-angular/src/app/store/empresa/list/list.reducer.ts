import { createReducer, on } from '@ngrx/store';
import { HttpParams } from "@angular/common/http";
import { ListActions } from './list.actions';
import { Empresa } from '@app/models/backend';



export interface ListState {
  empresas: Empresa[] | null;
  loading: boolean | null;
  error: string | null;
}

export const initialState: ListState = {
  empresas: null,
  loading: null,
  error: null
}


export const listReducer = createReducer(
  initialState,
  on(ListActions.readAllStart, (state) => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),
  on(ListActions.readAllSuccess, (state, { data }) => {
    return {
      ...state,
      loading: false,
      empresas: data,
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
