import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ActiveEffects } from './active.effects';
import { activeReducer } from './active.reducer';
import { activeEmpresaFeatureKey } from './active.selectors';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(activeEmpresaFeatureKey, activeReducer),
        EffectsModule.forFeature([ActiveEffects])
    ],
    providers: [ActiveEffects]
})
export class ActiveModule { }
