import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeHeaderComponent } from './welcome-header.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    WelcomeHeaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    WelcomeHeaderComponent
  ]
})
export class WelcomeHeaderModule { }
