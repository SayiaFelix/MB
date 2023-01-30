import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_metronic/shared/crud-table/services/http.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hasError: boolean;
  errorMessage: string = '';
  clicks: number = 0;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';

    //   this.errorMessage.subscribe(data => {
    //    console.log(data);
    //     this.changeDetector.markForCheck();
    // });


  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.clicks++;
    this.hasError = false;
    const model = {
      "logoutElseWhere": true,
      "username": this.f.email.value,
      "password": this.f.password.value
    }
    // this.httpService.login('auth/login-portal', model).subscribe(
    //   result => {
    //     if (result.response.code == 200) {
    //       this.authService.currentUserValue = result.data.user;
    //       console.log(this.returnUrl)

    //       this.errorMessage = '';
    //       localStorage.setItem('access_token', result.data.access_token);
    //       localStorage.setItem('token_id', result.data.session_id);
    //       localStorage.setItem('user', JSON.stringify(result.data.user));
    //       localStorage.setItem('roles', JSON.stringify(result.data.roles));
    //       this.router.navigate([this.returnUrl]);
    //     } else {
    //       this.errorMessage = result.response.description
    //     }
    //   });

      this.router.navigate(['/']);
  }

}
