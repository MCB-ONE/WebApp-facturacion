import { createReducer, on } from '@ngrx/store';
import { ListActions } from './list.actions';
import { Factura } from '@app/models/backend/factura';



export interface ListState {
  list: Factura[] | null;
  empresaId: number | null;
  loading: boolean | null;
  error: string | null;
}

export const initialState: ListState = {
  list: null,
  empresaId: null,
  loading: null,
  error: null
}


export const listReducer = createReducer(
  initialState,
  on(ListActions.readAllStart, (state, { empresaId }) => {
    return {
      ...state,
      empresaId: empresaId,
      loading: true,
      error: null,
    }
  }),
  on(ListActions.readAllSuccess, (state, { list }) => {
    return {
      ...state,
      loading: false,
      list: list,
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
