import { Injectable } from '@angular/core';
import {ReplyService} from './reply.service';
import {Ticket} from "../models/Ticket";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth-service/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {HelpdeskTableComponent} from "../helpdesk-table/helpdesk-table.component";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private helpdeskTableComponent: HelpdeskTableComponent | null = null;
  private sidebarComponent: SidebarComponent | null = null;
  setHelpdeskTableComponent(component: HelpdeskTableComponent): void {
    this.helpdeskTableComponent = component;
  }
  setSidebarComponent(component: SidebarComponent): void {
    this.sidebarComponent = component;
  }

  getHelpdeskTableComponent(): HelpdeskTableComponent | null {
    return this.helpdeskTableComponent;
  }
  getSidebarComponent(): SidebarComponent | null {
    return this.sidebarComponent;
  }

  constructor(
    private replyService: ReplyService,
    private Http: HttpClient,
    ) {
  }


  private tickets!: Ticket[];
  ticketStatusOptions: string[] = ['Open', 'Pending','In progress', 'Resolved', 'Closed'];
  private baseURL = 'https://localhost:44353/api/Ticket';


  public getAllTickets(): Observable<Ticket[]> {
    return this.Http.get<Ticket[]>(`${this.baseURL}`);
  }

  public getTicketsByUserId(userId: string | null): Observable<Ticket[]> {
    const URL= `${this.baseURL}/userId/${userId}`;
    return this.Http.get<Ticket[]>(URL);
  }

  public addTicket(ticket: Ticket): Observable<Ticket> {
    return this.Http.post<Ticket>(`${this.baseURL}/add`, ticket);
  }

  dataSource = new MatTableDataSource<Ticket>();

  public showTicketsByStatusAndPriority(tickets: MatTableDataSource<Ticket>,status:string,priority : string): MatTableDataSource<Ticket> {
    const newTickets = tickets.data.filter(ticket => ticket.status === status && ticket.priority === priority );
    return  new MatTableDataSource<Ticket>(newTickets);
  }
  public showTicketsByStatus(tickets: MatTableDataSource<Ticket>,status:string): MatTableDataSource<Ticket> {
    const newTickets = tickets.data.filter(ticket => ticket.status === status );
    return  new MatTableDataSource<Ticket>(newTickets);
  }

  public showTicketsByPriority(tickets: MatTableDataSource<Ticket>,priority:string): MatTableDataSource<Ticket> {
    const newTickets = tickets.data.filter(ticket => ticket.priority === priority );
    return  new MatTableDataSource<Ticket>(newTickets);
  }


  getTicketById(id: number): Observable<Ticket> {
    const URL= `${this.baseURL}/id/${id}`;
    return this.Http.get<Ticket>(URL);
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    const URL= `${this.baseURL}/update/${ticket.id}`;
    return this.Http.put<Ticket>(URL, ticket);
  }

  deleteTicket(id: number): Observable<Ticket> {
    const URL= `${this.baseURL}/delete/${id}`;
    return this.Http.delete<Ticket>(URL);
  }

  getDivColor(status: string,color: string[]) {
    switch (status) {
      case 'Open':
        return color[0];
      case 'Pending':
        return color[1];
      case 'In progress':
        return color[2];
      case 'Resolved':
        return color[3];
      case 'Closed':
        return color[4];
      default:
        return 'black';
    }
  }
}
