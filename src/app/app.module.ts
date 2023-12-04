import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormCommandComponent } from './form-command/form-command.component';
import { GridRendererComponent } from './grid-renderer/grid-renderer.component';
import { ElementRendererComponent } from './element-renderer/element-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    FormCommandComponent,
    GridRendererComponent,
    ElementRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
