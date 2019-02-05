import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthMainService} from '../../../core/services';
import {CustomValidators} from '../../../shared/form/custom-validators/custom-validators.service';
import {RegisterDto} from '../../../core/dto';

@Component({
  selector: 'test-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    public registerForm: FormGroup;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    public isAuthenticated = false;
    public imgFile: File;
    private registerData: RegisterDto;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthMainService,
        ) {
    }

    public ngOnInit() {

        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, CustomValidators.emailValidator]],
            password: ['', Validators.required],
        });
    }

    public get formControls() {
        return this.registerForm.controls;
    }

    public onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid || !this.imgFile) {
            return;
        }
        const email = this.formControls.email.value.trim();
        const password = this.formControls.password.value.trim();
        this.registerData = {email, password};
        this.loading = true;
        this.authService.register(this.registerData, this.imgFile)
            .subscribe(
                data => {
                    this.isAuthenticated = true;
                    this.registerForm.reset();
                    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
                    this.router.navigate([this.returnUrl]);
                    this.authService.notifyAboutAuthentication(this.isAuthenticated);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    console.error(`register failed: ${error}`);
                });
    }

    public fileChangeEvent(event: any) {
        this.imgFile = event.target.files[0];
    }

}
