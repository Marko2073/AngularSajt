import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";
import {LayoutModule} from "./layout/layout.module";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {SharedModule} from "./shared/shared.module";
import {AdminLayoutModule} from "./admin-layout/admin-layout.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    LayoutModule,
    SharedModule,
    AdminLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
