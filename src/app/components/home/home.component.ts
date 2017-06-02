import { Component } from '@angular/core';
import {Auth} from '../../services/auth.service';
import {ProfileService} from '../../services/profile.service';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html'
})
export class HomeComponent  {
  public profile: any;
  constructor (public auth: Auth, public profileService: ProfileService) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  public syncProfile() {
    this.profileService.syncProfile(this.profile).subscribe((data) => {
      console.log('Got data', data);
    }, (err) => {
      console.log('Error getting data', err);
    });
  }
}

