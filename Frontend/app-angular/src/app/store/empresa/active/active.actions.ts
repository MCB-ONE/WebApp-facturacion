import { Empresa } from './../../../models/backend/empresa/index';
import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const ActiveActions = createActionGroup({
  source: 'Empresa',
  events: {
    // Get active empresa
    'Read active start': emptyProps(),
    'Read active success': props<{ empresa: Empresa }>(),
    'Read active error': props<{ error: string }>(),
    // Seleccion empresa activa
    'Change active empresa start': props<{ empresaId: string }>(),
    'Change active empresa success': props<{ empresa: Empresa }>(),
    'Change active empresa error':  props<{ error: string }>(),
  },
});
