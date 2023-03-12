import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DefaultModule } from './UI/layouts/default/default.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserGateway } from './domain/models/User/gateway/user-gateway';
import { UserService } from './infraestructure/driven-adapter/services/user/user.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    DefaultModule
  ],
  providers: [{provide : UserGateway, useClass: UserService}],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
