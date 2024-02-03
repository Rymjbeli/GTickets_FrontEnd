import {Component, Input} from '@angular/core';
import {Reply} from "../models/Reply";
import {Ticket} from "../models/Ticket";
import {TicketService} from "../services/ticket.service";
import {ReplyService} from "../services/reply.service";
import {NgForm} from "@angular/forms";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {LocalStorageService} from "../services/storage-service/local-storage.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent {
  replies!: Reply[];
  @Input() ticket: Ticket | undefined;
  user!: User | null;
  newReply!: Reply | undefined ;
  selectedStatus: string = '';
  ticketStatusOptions: string[] = this.ticketService.ticketStatusOptions;
  admin: boolean = false;
  closed: boolean = true ;
  ticketId!: number;

  constructor(
    private ticketService: TicketService,
    private ReplyService: ReplyService,
    private  userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  )
  {
  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        this.getTicketById(params['id']);
        this.ticketId = params['id'];
        this.getRepliesByTicketId();

      });
      this.getRepliesByTicketId();
      this.getUserById(LocalStorageService.getUserId()) ;
  }

  eventListener(msg : any){
    // this.getRepliesByTicketId(1);
    this.getRepliesByTicketId();
    this.updateModif();
  }
  getRepliesByTicketId() {
    this.ReplyService.getRepliesByTicketId(this.ticketId).subscribe({
        next: (replies: Reply[]) => {
          this.replies = replies;
        },
        error: (error) => {
          console.log('Error: ' + error);
        }
      }
    );
  }

  getTicketById(ticketId: number | undefined) {
    if (ticketId != null) {
      this.ticketService.getTicketById(ticketId).subscribe({
        next: (ticket: Ticket) => {
          this.ticket = ticket;
          this.selectedStatus = this.ticket.status;
          console.log(LocalStorageService.isAdminLoggedIn());
          this.admin = LocalStorageService.isAdminLoggedIn();
          this.closed = this.verifClosed();
        },
        error: (error) => {
          console.log('Error: ' + error);
        }
      });
    }
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

  addReply(formulaire: NgForm): void {
    if (this.ticket && this.user && formulaire.value.reply) {
      this.newReply = new Reply();
      this.newReply.createdAt = new Date();
      this.newReply.content = formulaire.value.reply;
      this.newReply.ticketId = this.ticket.id;
      this.newReply.userId = this.user.id;
      this.updateModif();
      console.log(this.newReply);
      this.ReplyService.addReply(this.newReply).subscribe({
        next: (reply: Reply) => {
          this.getRepliesByTicketId();
          formulaire.reset();
        },
        error: (error) => {
          console.log('Error: ' + error);
        }
      });
    }
  }
  updateTicketStatus() {
  if (this.ticket) {
    this.ticket.status = this.selectedStatus;
    this.closed = this.verifClosed();
    this.updateModif();
    this.ticketService.updateTicket(this.ticket).subscribe({
      next: (ticket: Ticket) => {
        this.ticket = ticket;
      },
      error: (error) => {
        console.log('Error: ' + error);
      }
    });
  }
  }
  updateModif(){
    if(this.ticket){
      this.ticket.updatedAt= new Date();
      this.ticketService.updateTicket(this.ticket).subscribe({
        next: (ticket: Ticket) => {
          this.ticket = ticket;
        },
        error: (error) => {
          console.log('Error: ' + error);
        }
      });
    }
  }

  deleteTicket() {
    if (this.ticket) {
      this.ticketService.deleteTicket(this.ticket.id).subscribe({
        next: (data: any) => {
          console.log(data);
          this.toastr.success('Ticket deleted successfully');
          this.router.navigate(['tickets/all']);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }
  getDivColor(status: string) {
    return this.ticketService.getDivColor(status, this.ReplyService.divColor);
  }
  verifClosed(){
    return this.ticket?.status == 'Closed';
  }

  goBack() {
    this.router.navigate(['tickets/all']);
  }
}
