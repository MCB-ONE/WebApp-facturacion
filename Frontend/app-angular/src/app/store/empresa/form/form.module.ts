import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { empresaFormFeatureKey } from './from.selectors';
import { formReducer } from './form.reducer';
import { FormEffects } from './form.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(empresaFormFeatureKey, formReducer),
        EffectsModule.forFeature([FormEffects])
    ],
    providers: [FormEffects]
})
export class FormModule { }
