import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { DatabindingComponent } from './databinding/databinding.component';
import { Tarefa3Component } from './tarefa3/tarefa3.component';
@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    DatabindingComponent,
    Tarefa3Component
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [Tarefa3Component]
})
export class AppModule {}
