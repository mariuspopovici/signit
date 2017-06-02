import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig } from './auth.config';
import { options } from '../auth.options';

import {ProfileService} from './profile.service';


import {Router} from '@angular/router';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, options);
  syncResult: any;

  constructor(private router: Router, private profileService: ProfileService) {
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getProfile(authResult.idToken, function (error: any, profile: any) {
        if (error) {
          throw new Error(error);
        }

        // cache id_token and profile
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));

        // sync auth user profile with local profiles collection upon successful login
        profileService.syncProfile(profile).subscribe((data) => {}, (err) => {
          console.error('Error syncing user profile.', err);
        });

      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  };
}
