import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import {CardComponent} from "./components/products/components/card/card.component";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    ProductsComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule

  ]
})
export class ProductsModule {


}
