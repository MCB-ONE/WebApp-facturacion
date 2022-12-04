import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsuarioState } from "./usuario.reducer";


export const getUsuarioState = createFeatureSelector<UsuarioState>('usuario');

export const getUsuario = createSelector(
  getUsuarioState,
  (state) => state.entity
)

export const getLoading = createSelector(
  getUsuarioState,
  (state) => state.loading
)


// Saber si el usuario esta autorizado => Si existe el id  es autorizado, en caso contrario no lo está
export const getIsAuthorized = createSelector(
  getUsuarioState,
  (state) => !!state.id
)
