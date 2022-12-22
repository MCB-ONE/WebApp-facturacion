import { Factura } from '@app/models/backend/factura/index';
import { createReducer, on } from '@ngrx/store';
import { FacturaForm } from './form.models';
import { FormActions } from './form.actions';
import { LineaFactura } from '@app/models/backend/lineaFactura';


export type FacturaFormState = FacturaForm;


const initialFormSatate: FacturaFormState = {
  empresaId: null,
  numero: null,
  fechaExpedicion: null,
  subtotal: null,
  iva: null,
  cliente: null,
  lineasFactura: null
};

export interface FormState {
  factura: Factura | null;
  form: FacturaFormState;
  loading: boolean | null;
  error: string | null;
}

const initialState: FormState = {
  factura: null,
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
  on(FormActions.createSuccess, (state, { factura }) => {
    return {
      ...state,
      loading: false,
      error: null,
      factura: factura
    }
  }),
  on(FormActions.createError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
      factura: null
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
  on(FormActions.updateSuccess, (state, { factura }) => {
    return {
      ...state,
      loading: false,
      error: null,
      factura: factura
    }
  }),
  on(FormActions.updateError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
      factura: null
    }
  }),
  // Obtener factura por id
  on(FormActions.readStart, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    }
  }),
  on(FormActions.readSuccess, (state, { factura }) => {
    return {
      ...state,
      loading: false,
      error: null,
      factura: factura
    }
  }),
  on(FormActions.readError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
      factura: null
    }
  }),
    // Actualización líneas
    on(FormActions.updateLineasStart, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }),
    on(FormActions.updateLineasSuccess, (state) => {
      return {
        ...state,
        loading: false,
        error: null,
      }
    }),
    on(FormActions.updateLineasError, (state, { error }) => {
      return {
        ...state,
        loading: false,
        error: error,
        factura: null
      }
    }),
)
