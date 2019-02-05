import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {CoreRoutingModule} from './core-routing.module';

import {throwIfAlreadyLoaded} from './guards';

import {ErrorInterceptor} from './interceptors';

import {NotFoundComponent} from '../pages/not-found/not-found.component';
import {HomePageComponent} from '../pages/home-page/home-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CoreRoutingModule,
    HttpClientModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
