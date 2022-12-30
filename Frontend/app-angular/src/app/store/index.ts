import { ActionReducerMap } from "@ngrx/store";
import * as fromUsuario from './usuario/index';

export interface State {
  usuario: fromUsuario.UsuarioState;
}

export const ROOT_REDUCERS: ActionReducerMap<State> = {
  usuario: fromUsuario.reducer,
}

export const ROOT_EFFECTS = [
  fromUsuario.UsuarioEffects,
];
