import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { LogInComponent } from './authentication/log-in/log-in.component';
import { AuthenticationModule } from './authentication/authentication.module';

import { AppRoutingModule } from './app-routing.module';
import { MyAccountModule } from './my-account/my-account.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RecipesModule } from './recipes/recipes.module';

import { AuthInterceptor } from './core/services/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyAccountModule,
    CoreModule,
    SharedModule,
    RecipesModule,
    AppRoutingModule,
    AuthenticationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
