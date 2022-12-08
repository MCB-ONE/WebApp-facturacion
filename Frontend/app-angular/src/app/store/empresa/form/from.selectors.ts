import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FormState } from "./form.reducer";

export const empresaFormFeatureKey = 'empresa-form';

const getFormState = createFeatureSelector<FormState>(empresaFormFeatureKey)

export const getForm = createSelector(
  getFormState,
  (state: FormState) => state.form
)

export const getEmpresa = createSelector(
  getFormState,
  (state: FormState) => state.empresa
)

export const getLoading = createSelector(
  getFormState,
  (state: FormState) => state.loading
)

export const getError = createSelector(
  getFormState,
  (state: FormState) => state.error
)
