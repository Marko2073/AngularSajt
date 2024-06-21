import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Dodajte FormsModule

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/home/components/table/table.component';

@NgModule({
  declarations: [
    HomeComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,  // Dodajte FormsModule ovde
    AdminRoutingModule
  ]
})
export class AdminModule { }
