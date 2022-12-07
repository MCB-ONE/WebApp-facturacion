import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ListState } from "./list.reducer";


export const empresaListFeatureKey = 'empresas';

const getListState = createFeatureSelector<ListState>(empresaListFeatureKey)

export const getEmpresas = createSelector(
  getListState,
  (state: ListState) => state.pagination
)

export const getPaginatioRequest = createSelector(
  getListState,
  (state: ListState) => state.requestPagination
)

export const getLoading = createSelector(
  getListState,
  (state: ListState) => state.loading
)

export const getError = createSelector(
  getListState,
  (state: ListState) => state.error
)
