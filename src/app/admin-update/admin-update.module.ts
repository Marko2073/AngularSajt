import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUpdateRoutingModule } from './admin-update-routing.module';
import { UpdateComponent } from './components/update/update.component';


@NgModule({
  declarations: [
    UpdateComponent
  ],
  imports: [
    CommonModule,
    AdminUpdateRoutingModule
  ]
})
export class AdminUpdateModule { }
