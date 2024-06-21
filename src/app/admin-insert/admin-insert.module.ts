import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminInsertRoutingModule } from './admin-insert-routing.module';
import { InsertComponent } from './components/insert/insert.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    InsertComponent
  ],
  imports: [
    CommonModule,
    AdminInsertRoutingModule,
      ReactiveFormsModule,
      FormsModule,

  ]
})
export class AdminInsertModule { }
