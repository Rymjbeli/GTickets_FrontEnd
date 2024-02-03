import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../models/Ticket";
import {AuthService} from "./auth-service/auth.service";
import {LocalStorageService} from "./storage-service/local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'https://localhost:44353/api/User';


  constructor(
    private Http: HttpClient,
    private AuthService: AuthService
  ) {

  }
  getUsers(): Observable<User[]> {
    return this.Http.get<User[]>(this.baseURL);
  }
  getUserById(id: string | null): Observable<User> {
    const URL= `${this.baseURL}/${id}`;
    return this.Http.get<User>(URL);
  }

  isVerified(id: string | null): Observable<Boolean> {
    const URL= `${this.baseURL}/isVerified/${id}`;
    return this.Http.get<Boolean>(URL);
  }
}
