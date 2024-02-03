import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable, tap} from "rxjs";
import {LocalStorageService} from "../storage-service/local-storage.service";
export const AUTH_HEADER = "authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'https://localhost:44353/api/Authentication';

  constructor(
    private Http: HttpClient,
    private storageService: LocalStorageService
  ) { }

  login(email: string, password: string, rememberMe: boolean): any {
    console.log(email, password);
    return this.Http.post<[]>(`${this.baseURL}/login`,
      { email, password },
      { params: { rememberMe: rememberMe.toString() },observe: 'response' })
      .pipe(
        tap(_ => this.log("User Authentication")),
        map((res: HttpResponse<any>) => {
          const expirationDate = new Date(res.body.expiration);
          this.storageService.saveUserId(res.body.userId);
          this.storageService.saveUserRole(res.body.role);
          this.storageService.saveExpirationDate(expirationDate);
          console.log('Userss', res.body.userId);
          console.log('Token:', res.body.token);
          console.log('Role: ', res.body.role);
          console.log('Token expiration date:', localStorage.getItem('I_expirationDate'));
          this.storageService.saveToken(res.body.token);
          return res;
        })
      )
  }

  log(message: string): void {
    console.log(`User Auth Service: ${message}`)
  }

  // createAuthorizationHeader(): HttpHeaders {
  //   let authHeader = new HttpHeaders();
  //   return authHeader.set('Authorization', `Bearer ${LocalStorageService.getToken()}`);
  // }

  signup(signupData: any) : Observable<Object> {
    return this.Http.post(`${this.baseURL}/register`, signupData);
  }

  // verifyEmail(email: string, otp: string) : Observable<Object> {
  //   return this.Http.put(`${this.baseURL}/verify-account`, {email, otp})
  // }

  regenerateOtp(email: string): Observable<Object> {
    const emailObject = { email }; // Wrap the email in an object
    return this.Http.put(`${this.baseURL}/resend-confirmation-email`, emailObject, { responseType: 'text' });
  }

}
