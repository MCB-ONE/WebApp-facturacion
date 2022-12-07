import { Empresa } from '@app/models/backend/empresa';
import { createReducer, on } from '@ngrx/store';
import { ActiveActions } from './active.actions';



export interface ActiveEmpresaState {
  activeEmpresa: Empresa | null;
  loading: boolean | null;
  error: string | null;
}

export const initialState: ActiveEmpresaState = {
  activeEmpresa: null,
  loading: null,
  error: null
}


export const activeReducer = createReducer(
  initialState,
  on(ActiveActions.readActiveStart, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    }
  }),
  on(ActiveActions.readActiveSuccess, (state, { empresa }) => {
    return {
      ...state,
      loading: false,
      error: null,
      activeEmpresa: empresa
    }
  }),
  on(ActiveActions.readActiveError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
      activeEmpresa: null
    }
  }),
  on(ActiveActions.changeActiveEmpresaStart, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(ActiveActions.changeActiveEmpresaSuccess, (state, { empresa }) => {
    return {
      ...state,
      loading: false,
      activeEmpresa: empresa
    }
  }),
  on(ActiveActions.changeActiveEmpresaError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      activeEmpresa: null,
      error: error
    }
  }),
)
