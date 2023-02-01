import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_metronic/shared/crud-table/services/http.service';
import { AuthHTTPService } from '../_services/auth-http/auth-http.service';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

public loginForm! : FormGroup;
  // loginForm: FormGroup;

  hasError: boolean;
  errorMessage: string = '';
  clicks: number = 0;
  // returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    // private toast: NgToastrService,
    private httpAuthService : AuthHTTPService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.validateForm();
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  validateForm() {
    this.loginForm = this.fb.group({
      username: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      pin: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]),
      ],
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      // send obj to db
      console.log(this.loginForm.value);
      this.httpAuthService.loginUser(this.loginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            alert('Login Successfully')
            // this.toast.success
            //   ({ detail: 'Success Message', summary: "Login Completed Successfully!!", duration: 5000 })
            this.loginForm.reset();
            // this.auth.storedToken(res.token)
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            this.errorMessage = 'Login Failed ,Kindly Try Again.';
            // alert('Login Failed')
            // this.toast.error
            //   ({ detail: 'Failed Message', summary: "Login Failed, Something Went wrong!!", duration: 5000 })
          }
        })
    }
  }
  }

