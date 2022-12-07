import { ListEffects } from './list.effects';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { listReducer } from './list.reducer';
import { empresaListFeatureKey } from './list.selectors';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(empresaListFeatureKey, listReducer),
        EffectsModule.forFeature([ListEffects])
    ],
    providers: [ListEffects]
})
export class ListModule { }
