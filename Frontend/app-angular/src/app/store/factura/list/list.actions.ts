import { Factura } from '@app/models/backend/factura/index';
import { HttpParams } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Pagination } from "./list.models";


export const ListActions = createActionGroup({
  source: 'Factura',
  events: {
    // Get all
    'Read all start': props<{
      empresaId: number;
    }>(),
    'Read all success': props<{ list: Factura[] | any }>(),
    'Read all error': props<{ error: string }>()
  },
});
