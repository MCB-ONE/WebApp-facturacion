import { ActionReducerMap } from "@ngrx/store";
import * as fromUsuario from './usuario/index';

export interface State {
  //dictionaries: any;
  usuario: fromUsuario.UsuarioState;
}

export const reducers: ActionReducerMap<State> = {
  usuario: fromUsuario.reducer,
}

export const effects = [
  fromUsuario.UsuarioEffects,
];
