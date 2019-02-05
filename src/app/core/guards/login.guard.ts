import {Injectable} from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import {AuthMainService} from '../services';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthMainService
    ) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.isAuthenticated()) {
            this.redirectToHomePage();
            return false;
        }
        return true;
    }

    public redirectToHomePage() {
        this.router.navigateByUrl('/home');
    }
}
