import { Injectable } from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../user.service";
const TOKEN = "I_token";
const USERID = "I_user";
const USERROLE = "I_role";
const EXPIRATIONDATE = "I_expirationDate";
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  saveUserId(userId: any) {
    window.localStorage.removeItem(USERID);
    window.localStorage.setItem(USERID, userId);
  }


  saveUserRole(role: any) {
    window.localStorage.removeItem(USERROLE);
    window.localStorage.setItem(USERROLE, role);
  }


  saveToken(token: any) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  saveExpirationDate(expirationDate: any) {
    window.localStorage.removeItem(EXPIRATIONDATE);
    window.localStorage.setItem(EXPIRATIONDATE, expirationDate);
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN)
  }
  static getUserId(): string | null {
    const userIdStr = localStorage.getItem(USERID);
    // if (userIdStr) {
    //   return parseInt(userIdStr, 10);
    // }
    return userIdStr;
  }
static tokenIsValid(): boolean {
    if(this.hasToken()){
      const expirationDate = this.getExpirationDate();
      if (expirationDate === null) {
        return false;
      }
      const now = new Date();
      return now < expirationDate;
    }
    return false;
    }



static getExpirationDate(): Date | null {
    const expirationDateStr = localStorage.getItem(EXPIRATIONDATE);
    if (expirationDateStr) {
      return new Date(expirationDateStr);
    }
    return null;
}
  static hasToken(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    return true;
  }

  static isUserLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string | null = this.getUserRole();
    return role == "USER"
  }

  static getUserRole(): string | null{
    return localStorage.getItem(USERROLE);
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string | null = this.getUserRole();
    console.log(role);
    return role == "Admin"
  }

  static signOut() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USERID);
    window.localStorage.removeItem(USERROLE);
    window.localStorage.removeItem(EXPIRATIONDATE);
  }
}
