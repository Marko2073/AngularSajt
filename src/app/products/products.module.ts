import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import {SharedModule} from "../shared/shared.module";
import {FilterBlockComponent} from "../shared/components/filter-block/filter-block.component";


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,

  ]
})
export class ProductsModule {


}
