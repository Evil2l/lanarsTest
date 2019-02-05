import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthMainService} from './core/services/auth-main.service';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;

  private authSubscription: Subscription;

  get isAuth(){
    return this.isAuthenticated;
  }

  constructor(private authService: AuthMainService) {
  }

  public ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();

    this.authSubscription = this.authService.watchAuthentication()
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  public ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  private logout(event) {
    event.preventDefault();
    this.authService.logout();
  }
}
