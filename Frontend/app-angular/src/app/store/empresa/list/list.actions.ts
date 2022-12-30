import { Empresa } from "@app/models/backend";
import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const ListActions = createActionGroup({
  source: 'Empresa',
  events: {
    // Get all
    'Read all start': emptyProps(),
    'Read all success': props<{ data: Empresa[] | any }>(),
    'Read all error': props<{ error: string }>()
  },
});
