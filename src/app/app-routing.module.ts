import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/components/layout/layout.component";

const routes: Routes = [{
  path:"",
  component:LayoutComponent,
  children:[
    {
      path:"",
      pathMatch:"full",
      redirectTo:"home"
    },
    {
      path:"home",
      loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
    },
    {
      path:"products",
      loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)
    },
    {
      path:"login",
      loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)
    },
    {
      path:"cart",
      loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule)
    },
    {
      path:"contact",
      loadChildren:()=>import('./contact/contact.module').then(m=>m.ContactModule)
    },
    {
      path:"products/:id",
      loadChildren:()=>import('./single/single.module').then(m=>m.SingleModule)
    }
  ]

}]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
