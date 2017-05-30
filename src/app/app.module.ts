import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpModule, Http, RequestOptions} from '@angular/http';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';


import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import {Auth} from './services/auth.service';

import { routing, appRoutingProviders } from './app.routing';
import { AuthGuard } from './auth.guard';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing],
  declarations: [ AppComponent, HomeComponent, ProfileComponent, ToolbarComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    appRoutingProviders,
    Auth,
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ]
})
export class AppModule { }
