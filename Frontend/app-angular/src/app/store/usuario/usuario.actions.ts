import { Action } from "@ngrx/store";
import { EmailPasswordCredentials, UsuarioCreateRequest, UsuarioResponse } from "./usuario.models";
export { EmailPasswordCredentials, UsuarioCreateRequest, UsuarioResponse  } from "./usuario.models";

export enum Types {
  /*INIT: Acción para saber si el suaurio esta logeado cada vez que se recarge la página.
  -> Si está logeado se ejecuta la busqueda de los datos del usuario en el backend
  */
  INIT = '[Usuario] Init: Start',
  INIT_AUTHORIZED = '[Usuario] Init: Authorized',
  INIT_UNAUTHORIZED = '[Usuario] Init: Unauthorized',
  INIT_ERROR = '[Usuario] Init: Error',

  /**Acciones para login */
  SINGIN_IN_EMAIL = '[Usuario] Login: Start',
  SINGIN_IN_EMAIL_SUCCESS = '[Usuario] Login: Success',
  SINGIN_IN_EMAIL_ERROR = '[Usuario] Login: Error',

  /**Acciones para el registro */
  SINGIN_UP_EMAIL = '[Usuario] Sign Up con email: Start',
  SINGIN_UP_EMAIL_SUCCESS = '[Usuario] Sign Up con email: Success',
  SINGIN_UP_EMAIL_ERROR = '[Usuario] Sign Up con email: Error',

  /**Acciones para logout/cierre sessión */
  SINGIN_OUT_EMAIL = '[Usuario] Logout: Start',
  SINGIN_OUT_EMAIL_SUCCESS = '[Usuario] Logout: Success',
  SINGIN_OUT_EMAIL_ERROR = '[Usuario] Logout: Error',

}


/**Operaciones tipo INIT*/
export class Init implements Action {
  readonly type = Types.INIT;
  constructor(){};
}

export class InitAuthorized implements Action {
  readonly type = Types.INIT_AUTHORIZED;
  constructor(public id: string, public usuario: UsuarioResponse | null){};

}

export class InitUnauthorized implements Action {
  readonly type = Types.INIT_UNAUTHORIZED;
  constructor(){};
}

export class InitError implements Action {
  readonly type = Types.INIT_ERROR;
  constructor(public error: string){};
}


/**Operaciones tipo SIGNIN*/
export class SignInEmail implements Action{
  readonly type = Types.SINGIN_IN_EMAIL;
  constructor(public credentials: EmailPasswordCredentials){};
}

export class SignInEmailSuccess implements Action{
  readonly type = Types.SINGIN_IN_EMAIL_SUCCESS;
  constructor(public id: string, public usuario: UsuarioResponse | null){};
}

export class SignInEmailError implements Action{
  readonly type = Types.SINGIN_IN_EMAIL_ERROR;
  constructor(public error: string){};
}

/**Operaciones tipo SIGNUP*/
export class SignUpEmail implements Action{
  readonly type = Types.SINGIN_UP_EMAIL;
  constructor(public usuario: UsuarioCreateRequest){};
}

export class SignUpEmailSuccess implements Action{
  readonly type = Types.SINGIN_UP_EMAIL_SUCCESS;
  constructor(public id: string, public usuario: UsuarioResponse | null){};
}

export class SignUpEmailError implements Action{
  readonly type = Types.SINGIN_UP_EMAIL_ERROR;
  constructor(public error: string){};
}

/**Operaciones tipo SIGNOUT/ SALIR DE SESSIÓN*/
export class SignOut implements Action{
  readonly type = Types.SINGIN_OUT_EMAIL;
  constructor(){};
}

export class SignOutSuccess implements Action{
  readonly type = Types.SINGIN_OUT_EMAIL_SUCCESS;
  constructor(){};
}

export class SignOutError implements Action{
  readonly type = Types.SINGIN_OUT_EMAIL_ERROR;
  constructor(public error: string){};
}


export type All =
  Init
  | InitAuthorized
  | InitUnauthorized
  | InitError
  | SignInEmail
  | SignInEmailSuccess
  | SignInEmailError
  | SignUpEmail
  | SignUpEmailSuccess
  | SignUpEmailError
  | SignOut
  | SignOutSuccess
  | SignOutError;
