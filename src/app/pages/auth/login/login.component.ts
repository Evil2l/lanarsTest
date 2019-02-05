import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthMainService} from '../../../core/services';

import {
    AuthService,
    GoogleLoginProvider
} from 'angular-6-social-login-v2';

@Component({
  selector: 'test-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public isAuthenticated = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthMainService,
    private socialAuthService: AuthService
  ) {
  }

  public ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.removeToken();
  }

  public socialSignIn(socialPlatform: string) {
      let socialPlatformProvider;
      if (socialPlatform === 'google') {
          socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }

      this.socialAuthService.signIn(socialPlatformProvider).then(
          (userData) => {
              if (userData && userData.token) {
                  this.authService.socialSetToken(userData.token);
                  this.isAuthenticated = true;
                  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
                  this.router.navigate([this.returnUrl]);
                  this.authService.notifyAboutAuthentication(this.isAuthenticated);
              }

          }
      );

      this.preventDefault(event);
  }

  public get formControls() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.formControls.email.value.trim();
    const password = this.formControls.password.value.trim();
    this.loading = true;
    this.authService.login(email, password)
      .subscribe(
        data => {
          this.isAuthenticated = true;
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigate([this.returnUrl]);
          this.authService.notifyAboutAuthentication(this.isAuthenticated);
        },
        error => {
          this.error = error;
          this.loading = false;
          console.error(`login failed: ${error}`);
        });
  }

    private preventDefault(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
    }
}
