import { Usuario } from "@app/models/backend";
export { Usuario as UsuarioResponse } from "@app/models/backend";



export interface EmailPasswordCredentials {
  email: string;
  password: string;
}

export interface UsuarioRequest extends Usuario {
  password: string;
}

export type UsuarioCreateRequest = Omit<UsuarioRequest,'id' | 'token' | 'imagen' | 'admin'>;
