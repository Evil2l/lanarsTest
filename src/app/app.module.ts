import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider
} from 'angular-6-social-login-v2';

// Configs
export function getAuthServiceConfigs() {
    return new AuthServiceConfig(
        [
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('240460897945-bi23ad4ajcp23lm6es2f0kdcn042f7cm.apps.googleusercontent.com')
            }
        ]);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SocialLoginModule
  ],
  providers: [
      {
          provide: LocationStrategy,
          useClass: HashLocationStrategy},
      {
          provide: AuthServiceConfig,
          useFactory: getAuthServiceConfigs
      }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
