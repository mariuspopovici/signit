import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpModule, Http, RequestOptions} from '@angular/http';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import {DndModule} from 'ng2-dnd';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {GroupsComponent} from './components/groups/groups.component';

// services
import {Auth} from './services/auth.service';
import {GroupsService} from './services/groups.service';
import {ProfileService} from './services/profile.service';

import { routing, appRoutingProviders } from './app.routing';
import { AuthGuard } from './auth.guard';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing, DndModule.forRoot()],
  declarations: [ AppComponent, HomeComponent, ProfileComponent, ToolbarComponent, GroupsComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    appRoutingProviders,
    Auth,
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    GroupsService,
    ProfileService
  ]
})
export class AppModule { }
