import { LineaFactura } from '@app/models/backend/lineaFactura';
import { Factura } from "@app/models/backend/factura";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { FacturaCreateRequest, FacturaForm, FacturaUpdateRequest } from "./form.models";


export const FormActions = createActionGroup({
  source: 'Factura',
  events: {
    // Creación
    'Create start': props<{ factura: FacturaCreateRequest }>(),
    'Create success': props<{ factura: Factura }>(),
    'Create error': props<{ error: string }>(),

    //Actualizacion
    'Update start': props<{ facturaId: string; factura: FacturaUpdateRequest }>(),
    'Update success': props<{ factura: Factura }>(),
    'Update error': props<{ error: string }>(),

    //Formulario
    'Form set': props<{ form: FacturaForm }>(),
    'Form update': props<{ changes: Partial<FacturaForm> }>(),
    'Form clear': emptyProps(),

    // Obtener por id
    'Read start': props<{ facturaId: string }>(),
    'Read success': props<{ factura: Factura }>(),
    'Read error': props<{ error: string }>(),

    //Actualizacion líneas
    'Update lineas start': props<{ facturaId: number; lineasFactura: LineaFactura[] }>(),
    'Update lineas success': props<{ factura: Factura }>(),
    'Update lineas error': props<{ error: string }>(),
  },
});
