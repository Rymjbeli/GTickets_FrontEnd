import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private baseURL =   'https://localhost:44353/api/Authentication';

  constructor(
    private Http: HttpClient,
  ) { }
  public resetPassword(Email: string, Password: string, Token: string): any {
    return this.Http.post(`${this.baseURL}/reset-password?`, {Password,Email, Token}, {responseType: 'text'});
  }

  public forgotPassword(email: string): any {
    return this.Http.post(`${this.baseURL}/forgot-password`,null,{params: {email},responseType: 'text'});
  }
}
