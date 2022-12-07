import { HttpParams } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Pagination } from "./list.models";


export const ListActions = createActionGroup({
  source: 'Empresa',
  events: {
    // Get all
    'Read all start': props<{
      requestPagination: HttpParams;
      paramsUrl: string
    }>(),
    'Read all success': props<{ pagination: Pagination | any }>(),
    'Read all error': props<{ error: string }>()
  },
});
