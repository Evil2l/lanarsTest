import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';

import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent
  ]
})
export class AuthModule {
}
