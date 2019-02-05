import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CustomValidators} from './form/custom-validators/custom-validators.service';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // CustomValidators,

    /* start primeng */
    ProgressSpinnerModule
    /* end primeng */
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // CustomValidators,

    /* start primeng */
    ProgressSpinnerModule
    /* end primeng */
  ]
})
export class SharedModule {
}
