import { Empresa } from "@app/models/backend/empresa";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ActiveEmpresaState } from "./active.reducer";


export const activeEmpresaFeatureKey = 'activeEmpresa';

const getActiveState = createFeatureSelector<ActiveEmpresaState>(activeEmpresaFeatureKey)

export const getActiveEmpresa = createSelector(
  getActiveState,
  (state: ActiveEmpresaState) => state.activeEmpresa
)
export const getLoading = createSelector(
  getActiveState,
  (state: ActiveEmpresaState) => state.loading
)

export const getError = createSelector(
  getActiveState,
  (state: ActiveEmpresaState) => state.error
)
