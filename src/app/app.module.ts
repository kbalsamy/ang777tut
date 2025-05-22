import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FFlowModule } from '@foblex/flow';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SideBySideTableComponent } from './components/table.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBySideTableComponent
  ],
  imports: [
    BrowserModule,
    FFlowModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
