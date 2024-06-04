import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';

import { SingleRoutingModule } from './single-routing.module';
import { SingleComponent } from './components/single/single.component';
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  declarations: [
    SingleComponent
  ],
  imports: [
    CommonModule,
    SingleRoutingModule,
    MatTabsModule, AsyncPipe
  ]
})
export class SingleModule { }
