import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { FocusDirective } from './shared/focus.directive';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-popover';
import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropzoneModule } from 'angular2-dropzone-wrapper';
import { DropzoneConfigInterface } from 'angular2-dropzone-wrapper';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GroupsComponent } from './components/groups/groups.component';
import { UploadComponent } from './components/upload/upload.component'

// services
import { Auth } from './services/auth.service';
import { GroupsService } from './services/groups.service';
import { ProfileService } from './services/profile.service';
import { routing, appRoutingProviders } from './app.routing';
import { AuthGuard } from './auth.guard';

// app consts
const DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  server: '/api/fileupload',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, routing, Ng2FilterPipeModule, Ng2DragDropModule, ModalModule.forRoot(), PopoverModule,
    JasperoConfirmationsModule, BrowserAnimationsModule, DropzoneModule.forRoot(DROPZONE_CONFIG)],
  declarations: [ AppComponent, HomeComponent, ProfileComponent, ToolbarComponent, GroupsComponent, FocusDirective,
    UploadComponent ],
  bootstrap: [ AppComponent ],
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
