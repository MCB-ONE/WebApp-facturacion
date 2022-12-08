import { Empresa } from '@app/models/backend/empresa/index';
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { EmpresaCreateRequest, EmpresaForm, EmpresaUpdateRequest } from "./form.models";


export const FormActions = createActionGroup({
  source: 'Empresa',
  events: {
    // Creación
    'Create start': props<{ empresa: EmpresaCreateRequest }>(),
    'Create success': props<{ empresa: Empresa }>(),
    'Create error': props<{ error: string }>(),

    //Actualizacion
    'Update start': props<{ empresaId: string; empresa: EmpresaUpdateRequest }>(),
    'Update success': props<{ empresa: Empresa }>(),
    'Update error': props<{ error: string }>(),

    //Formulario
    'Form set': props<{ form: EmpresaForm }>(),
    'Form update': props<{ changes: Partial<EmpresaForm> }>(),
    'Form clear': emptyProps(),
  },
});
