import { createReducer, on } from '@ngrx/store';
import { EmpresaForm } from './form.models';
import { Empresa } from '@app/models/backend';
import { FormActions } from './form.actions';


export type EmpresaFormState = EmpresaForm;


const initialFormSatate: EmpresaFormState = {
  nombre: null,
  nif: null,
  logo: null,
  calle: null,
  numero: null,
  codigoPostal: null,
  ciudad: null,
  provincia: null,
  pais: null,
  telefono: null,
  email: null
};

export interface FormState {
  empresa: Empresa | null;
  form: EmpresaFormState;
  loading: boolean | null;
  error: string | null;
}

const initialState: FormState = {
  empresa: null,
  form: initialFormSatate,
  loading: null,
  error: null
}

export const formReducer = createReducer(
  initialState,

  // Creacion
  on(FormActions.createStart, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    }
  }),
  on(FormActions.createSuccess, (state, { empresa }) => {
    return {
      ...state,
      loading: false,
      error: null,
      empresa: empresa
    }
  }),
  on(FormActions.createError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
      empresa: null
    }
  }),
    // Formulario
    on(FormActions.formSet, (state,  { form }) => {
      return {
        ...state,
        form: form
      }
    }),
    on(FormActions.formUpdate, (state, { changes }) => {
      return {
        ...state,
        ...changes
      }
    }),
    on(FormActions.formClear, (state) => {
      return {
        ...state
      }
    }),
  // Actualización
  on(FormActions.updateStart, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    }
  }),
  on(FormActions.updateSuccess, (state, { empresa }) => {
    return {
      ...state,
      loading: false,
      error: null,
      empresa: empresa
    }
  }),
  on(FormActions.updateError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
      empresa: null
    }
  }),
  // Obtener empresa por id
  on(FormActions.readStart, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    }
  }),
  on(FormActions.readSuccess, (state, { empresa }) => {
    return {
      ...state,
      loading: false,
      error: null,
      empresa: empresa
    }
  }),
  on(FormActions.readError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
      empresa: null
    }
  }),
)
