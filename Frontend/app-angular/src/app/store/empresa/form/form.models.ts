import { Empresa as DbEmpresa } from '@app/models/backend/empresa';

export type EmpresaCreateRequest = Omit<DbEmpresa, 'id' |'emailUsuario' | 'clientes' | 'direcciones'>;

export type EmpresaUpdateRequest = Omit<DbEmpresa, 'clientes' | 'direcciones'>;

export interface EmpresaForm {
  id: string | null;
  emailUsuario: string | null;
  nombre: string | null;
  nif: string | null;
  logo: string | null;
}



