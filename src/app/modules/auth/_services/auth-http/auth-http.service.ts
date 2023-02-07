import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../../_models/user.model";
import { environment } from "../../../../../environments/environment";
import { AuthLogin } from "../../_models/auth.model";

const API_LOGIN_URL = `${environment.loginUrl}/oauth/token/pin`;

@Injectable({
  providedIn: "root",
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  headers = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(environment.Username + ":" + environment.Password),
    }),
  };

  loginUser(UserLogin: AuthLogin) {
    return this.http.post<AuthLogin>(API_LOGIN_URL, UserLogin, this.headers);
  }

  // public methods
  // login(email: string, password: string): Observable<any> {
  //   return this.http.post<AuthModel>(`${API_USERS_URL}/login-portal`, { email, password });
  // }

  // // CREATE =>  POST: add a new user to the server
  // createUser(user: UserModel): Observable<UserModel> {
  //   return this.http.post<UserModel>(API_LOGIN_URL, user);
  // }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_LOGIN_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${API_LOGIN_URL}/me`, {
      headers: httpHeaders,
    });
  }
}
