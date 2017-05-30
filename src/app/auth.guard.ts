import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {Auth} from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private auth: Auth, private router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state : RouterStateSnapshot) {
        if (this.auth.authenticated()) {
            console.log('Auth guard passed.');
            return true;
        } else {
            console.log('Blocked by auth guard.');
            this.router.navigate(['/']);
            return false;
        }
    }
}