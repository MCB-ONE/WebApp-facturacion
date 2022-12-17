import { NgModule } from '@angular/core';
import { CamelCasePipe } from './camelCase/camel-case.pipe';
import { DataPropertyGetterPipe } from './DataPropertyGetter/data-property-getter.pipe';



@NgModule({
  declarations: [
    CamelCasePipe,
    DataPropertyGetterPipe
  ],
  exports: [
    CamelCasePipe,
    DataPropertyGetterPipe
  ]
})
export class PipesModule { }
