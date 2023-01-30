import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { JwtHelperService } from "@auth0/angular-jwt";
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedIn = false;
    public redirectURL = '';

    constructor(
        private _router: Router,
        private http: HttpClient,
      //  public helper: JwtHelperService,
        private _globalService: GlobalService
    ) { }
    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': 'Bearer ' + this.getToken()
        });
    }
    public login(username, password) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this.http.post(

            '',

            {

            },
            { headers: this.getHeaders() }
        ).pipe(
            map(data => {
                console.log(data);
                if (data['success'] === true) {
                    localStorage.setItem('access_token', data['data']['access_token']);
                    this.loggedIn = true;
                } else {
                    localStorage.removeItem('access_token');
                    this.loggedIn = false;
                }
                return data;
            }));
    }

    // public login(endpoint: any, model: any): any {
    //     return this.http.post(this._globalService.apiHost + endpoint, model, { headers: this.getHeadersWithoutBearer() }
    //     ).pipe(map(response => {
    //         response = response;
    //         return response;
    //     }));
    // }
    public logout(): void {
        let theToken = localStorage.getItem('access_token');
        localStorage.removeItem('token_id');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        localStorage.removeItem('roles');
        this.loggedIn = false;
        this._router.navigate(['/login']);
        this.logoutObservable(theToken).subscribe(() => {

        });
    }
    public logoutObservable(theToken): any {
        let hdrs =  new HttpHeaders({
            'Authorization': 'Bearer ' + theToken
        });
        return this.http.post(this._globalService.apiHost + 'auth/logout', {}, { headers: hdrs }
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    public getToken(): any {
        return localStorage.getItem('access_token');
    }
    public unauthorizedAccess(error: any): void {
        this.logout();

    }

    public isLoggedIn(): boolean {
        return true;
        //  console.log(this.getJWTValue())
       // return !this.helper.isTokenExpired(this.getToken());
    }

    public getJWTValue(): any {
       // return this.helper.decodeToken(this.getToken());
    }

    private handleError(error: Response | any) {

        let errorMessage: any = {};
        // Connection error
        if (error.status === 0) {
            errorMessage = {
                success: false,
                status: 0,
                data: 'Sorry, there was a connection error occurred. Please try again.'
            };
        } else {
            errorMessage = error.json();
        }
        return Observable.throw(errorMessage);
    }
}
