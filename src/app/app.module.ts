import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { AppRoutingModule } from './app-routing.module';
import { FloursComponent } from './flours/flours.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FloursComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
