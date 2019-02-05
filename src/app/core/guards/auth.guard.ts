import {Injectable} from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import {AuthMainService} from '../services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthMainService
    ) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.isAuthenticated()) {
            return true;
        }
        this.redirectToLoginPage(state);
        return false;
    }

    public redirectToLoginPage(state) {
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        // this.router.navigateByUrl('/auth/login');

    }
}
