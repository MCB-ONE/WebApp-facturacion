import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ListState } from "./list.reducer";


export const facturaListFeatureKey = 'factura';

const getListState = createFeatureSelector<ListState>(facturaListFeatureKey)

export const getFacturas = createSelector(
  getListState,
  (state: ListState) => state.list
)

export const getEmpresaId = createSelector(
  getListState,
  (state: ListState) => state.empresaId
)

export const getLoading = createSelector(
  getListState,
  (state: ListState) => state.loading
)

export const getError = createSelector(
  getListState,
  (state: ListState) => state.error
)
