import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsModule} from "./products.module";
import {ProductsComponent} from "./components/products/products.component";

const routes: Routes = [
  {
    path:"",
    component:ProductsComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
