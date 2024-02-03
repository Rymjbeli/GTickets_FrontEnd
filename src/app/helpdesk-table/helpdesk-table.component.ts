import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Ticket} from "../models/Ticket";
import {TicketService} from "../services/ticket.service";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {CreatePopUpComponent} from "../create-pop-up/create-pop-up.component";
import {MatSort} from "@angular/material/sort";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {LocalStorageService} from "../services/storage-service/local-storage.service";

@Component({
  selector: 'app-helpdesk-table',
  templateUrl: './helpdesk-table.component.html',
  styleUrls: ['./helpdesk-table.component.scss']
})
export class HelpdeskTableComponent implements OnInit, OnChanges {

  @Input() public status: string = '';
  @Input() public priority: string = '';
  admin: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns! : string[] ;

  dataSource = new MatTableDataSource<Ticket>();
  dataSource1 = new MatTableDataSource<Ticket>();

  constructor(
    private ticketsService: TicketService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getTickets();
    this.ticketsService.dataSource = this.dataSource;
    this.ticketsService.setHelpdeskTableComponent(this);
    this.displayedColumns = this.admin ?
      ['id', 'status', 'priority', 'title', 'user', 'date', 'modif', 'action']
      : ['status', 'priority', 'title', 'date', 'modif', 'action'];
  }

  ngOnChanges(): void {
    if (this.status !== '') {
      this.shownewTickets();
    }
  }

  public Tickets!: Ticket[];

  public getTickets(): void {
    if (LocalStorageService.isAdminLoggedIn()) {
      this.admin = true;
      this.getAllTickets();
    } else {
      this.admin = false;
      this.getTicketByUserId(LocalStorageService.getUserId());
    }

  }

  public getTicketByUserId(id: string | null): void {
    this.ticketsService.getTicketsByUserId(id).subscribe(
      {
        next: (response: Ticket[]) => {
          this.Tickets = response;
          this.dataSource = new MatTableDataSource<Ticket>(this.Tickets);
          this.dataSource1 = new MatTableDataSource<Ticket>(this.Tickets);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      }
    )
  }

  public getAllTickets(): void {
    this.ticketsService.getAllTickets().subscribe(
      {
        next: (response: Ticket[]) => {
          this.Tickets = response;
          console.log("tickets: ", response);
          this.dataSource = new MatTableDataSource<Ticket>(this.Tickets);
          this.dataSource1 = new MatTableDataSource<Ticket>(this.Tickets);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      }
    )
  }

  public shownewTickets(): void {
    console.log(this.status);
    console.log(this.priority);
    if (this.priority === undefined || this.priority === '') {
      this.dataSource = this.ticketsService.showTicketsByStatus(this.dataSource1, this.status);

      if (this.status === 'All') {
        this.dataSource = this.dataSource1;
      }
    } else if (this.status === undefined || this.status === 'All') {
      this.dataSource = this.ticketsService.showTicketsByPriority(this.dataSource1, this.priority);
    } else {
      this.dataSource = this.ticketsService.showTicketsByStatusAndPriority(this.dataSource1, this.status, this.priority);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePopUpComponent, {
      width: '400px',
      data: {helpdeskTableComponent: this}

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Filter tickets based on id, title, and user email
    this.dataSource.data = this.Tickets.filter(ticket =>
      ticket.id.toString().includes(filterValue) ||
      ticket.title.toLowerCase().includes(filterValue) ||
      (this.admin && ticket.user.email.toLowerCase().includes(filterValue))
    );

    // Update paginator and sort
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  moreInfo(id: number): void {
    this.router.navigate(['ticketDetails/', id]);
  }
}
