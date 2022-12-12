import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DateComponent } from './date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    DateComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule
  ],
  providers: [DatePipe],
  exports: [
    DateComponent
  ]
})
export class DateModule { }
