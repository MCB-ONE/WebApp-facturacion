import { UsuarioResponse } from "./usuario.models";
import * as fromActions from './usuario.actions';

export interface UsuarioState {
  entity: UsuarioResponse | null;
  id: string | null;
  loading: boolean | null;
  error?: string | null;
}

const initialState: UsuarioState = {
  entity: null,
  id: null,
  loading: false,
  error: null
}

export function reducer(state = initialState, action: fromActions.All | any): UsuarioState {
  switch (action.type) {
    // INIT ACTIONS
    case fromActions.Types.INIT: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case fromActions.Types.INIT_AUTHORIZED: {
      return {
        ...state,
        loading: false,
        id: action.id,
        entity: action.usuario,
        error: null
      };
    }
    case fromActions.Types.INIT_UNAUTHORIZED: {
      return {
        ...state,
        loading: false,
        id: null,
        entity: null,
        error: null
      };
    }
    case fromActions.Types.INIT_ERROR: {
      return {
        ...state,
        loading: false,
        id: null,
        entity: null,
        error: action.error
      };
    }
    // SINGIN ACTIONS
    case fromActions.Types.SINGIN_IN_EMAIL: {
      return {
        ...state,
        loading: true,
        id: null,
        entity: null,
        error: null
      };
    }
    case fromActions.Types.SINGIN_IN_EMAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        id: action.id,
        entity: action.usuario,
        error: null
      };
    }
    case fromActions.Types.SINGIN_IN_EMAIL_ERROR: {
      return {
        ...state,
        loading: false,
        id: null,
        entity: null,
        error: action.error
      };
    }

    // SINGUP ACTIONS
    case fromActions.Types.SINGIN_UP_EMAIL: {
      return {
        ...state,
        loading: true,
        id: null,
        entity: null,
        error: null
      };
    }
    case fromActions.Types.SINGIN_UP_EMAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        id: action.id,
        entity: action.usuario,
        error: null
      };
    }
    case fromActions.Types.SINGIN_UP_EMAIL_ERROR: {
      return {
        ...state,
        loading: false,
        id: null,
        entity: null,
        error: action.error
      };
    }
    // SINGUP ACTIONS
    case fromActions.Types.SINGIN_UP_EMAIL: {
      return {
        ...state,
        loading: true,
        id: null,
        entity: null,
        error: null
      };
    }
    case fromActions.Types.SINGIN_UP_EMAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        id: action.id,
        entity: action.usuario,
        error: null
      };
    }
    case fromActions.Types.SINGIN_UP_EMAIL_ERROR: {
      return {
        ...state,
        loading: false,
        id: null,
        entity: null,
        error: action.error
      };
    }
    // SINGOUT ACTIONS
    case fromActions.Types.SINGIN_OUT_EMAIL: {
      return { ...initialState };
    }
    case fromActions.Types.SINGIN_OUT_EMAIL_SUCCESS: {
      return { ...initialState };
    }
    case fromActions.Types.SINGIN_OUT_EMAIL_ERROR: {
      return {
        ...state,
        loading: false,
        id: null,
        entity: null,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
