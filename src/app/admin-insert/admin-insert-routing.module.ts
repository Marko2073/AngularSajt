import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InsertComponent} from "./components/insert/insert.component";

const routes: Routes = [
  {
    path:"",
    component:InsertComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminInsertRoutingModule { }
