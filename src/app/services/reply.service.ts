import { Injectable } from '@angular/core';
import {Reply} from "../models/Reply";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth-service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ReplyService {
  divColor = ['#6c91ce', '#b7589a', '#e3a32a', '#46A146FF', '#c44d56'];
  private baseURL = 'https://localhost:44353/api/Reply';
  constructor(
    private Http: HttpClient,
    ) {
  }

  // getReplies(): Observable<Reply[]> {
  //   return this.Http.get<Reply[]>(this.baseURL);
  // }

  getRepliesByTicketId(ticketId: number): Observable<Reply[]> {
    const URL= `${this.baseURL}/ticketId/${ticketId}`;
    return this.Http.get<Reply[]>(URL);
  }

  addReply(reply: Reply): Observable<Reply> {
    return this.Http.post<Reply>(`${this.baseURL}/add`, reply);
  }

  deleteReply(id: number): Observable<Reply> {
    const URL= `${this.baseURL}/delete/${id}`;
    return this.Http.delete<Reply>(URL);
  }
}
