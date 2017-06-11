import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AuthGuard} from './auth.guard';
import { GroupsComponent } from './components/groups/groups.component';
import { UploadComponent } from './components/upload/upload.component';

const appRoutes: Routes = [
    {
        path: '',
        component : HomeComponent
    },
    {
        path: 'profile',
        component : ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'upload',
        component: UploadComponent,
        canActivate: [AuthGuard]
    }
];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

