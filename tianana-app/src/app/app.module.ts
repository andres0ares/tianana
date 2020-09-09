import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';

import { ProductService } from './services/product.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { UsersService } from './services/users.service';
import { AuthGuardService } from './services/auth-guard.service'
import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor'
import { AuthService } from './services/auth.service'
import { baseURL } from '../shared/baseURL';

import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegistrarComponent,
    ProductdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ProductService, 
    ProcessHTTPMsgService,
    {provide: 'BaseURL', useValue: baseURL},
    UsersService,
    AuthGuardService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
