import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FormState } from "./form.reducer";

export const facturaFormFeatureKey = 'factura-form';

const getFormState = createFeatureSelector<FormState>(facturaFormFeatureKey)

export const getForm = createSelector(
  getFormState,
  (state: FormState) => state.form
)

export const getFactura = createSelector(
  getFormState,
  (state: FormState) => state.factura
)

export const getLoading = createSelector(
  getFormState,
  (state: FormState) => state.loading
)

export const getError = createSelector(
  getFormState,
  (state: FormState) => state.error
)
