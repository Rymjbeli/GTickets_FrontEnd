import {Component} from '@angular/core';
import {TicketService} from "../services/ticket.service";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Ticket} from "../models/Ticket";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {LocalStorageService} from "../services/storage-service/local-storage.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-pop-up',
  templateUrl: './create-pop-up.component.html',
  styleUrls: ['./create-pop-up.component.scss']
})
export class CreatePopUpComponent {
  private newTicket!: Ticket;
  private user!: User;

  constructor(
    private ticketsService: TicketService,
    private userService: UserService,
    private dialogRef: MatDialogRef<CreatePopUpComponent>,
    private toastr: ToastrService,
  ) {
  }
  ngOnInit(): void {
    this.getUserById(LocalStorageService.getUserId());
  }
  getUserById(userId: string | null):void {
    if (typeof userId === "string") {
      this.userService.getUserById(userId).subscribe({
        next: (user: User) => {
          this.user = user;
        },
        error: (error) => {
          console.log('Error: ' + error);
        }
      });
    }
  }

  public onAddTicket(addForm: NgForm): void {
    this.newTicket = new Ticket();
    this.newTicket.title = addForm.value.title;
    this.newTicket.content = addForm.value.content;
    this.newTicket.priority = addForm.value.priority;
    this.newTicket.status = "Open";
    // this.newTicket.user = this.user;
    this.newTicket.userId = this.user.id;
    this.newTicket.createdAt = new Date();
    this.newTicket.updatedAt = new Date();
    console.log("this ticket", this.newTicket);
    this.ticketsService.addTicket(this.newTicket).subscribe(
      {
        next: (response: Ticket) => {
          console.log(response);
          this.toastr.success('Ticket added successfully');
          this.ticketsService.getAllTickets();
          addForm.resetForm();
          this.dialogRef.close();
          const helpdeskTableComponent = this.ticketsService.getHelpdeskTableComponent();
          const sidebarComponent = this.ticketsService.getSidebarComponent();
          if (helpdeskTableComponent) {
            // Call the getTickets method to update the tickets
            helpdeskTableComponent.getTickets();
            sidebarComponent?.shownewTickets('All','');

            this.ticketsService.dataSource = helpdeskTableComponent.dataSource;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      }
    );
  }

}
