import {Component, ViewChild} from '@angular/core';
import {TicketService} from "../services/ticket.service";
import {LocalStorageService} from "../services/storage-service/local-storage.service";
import {Router} from "@angular/router";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {MatDrawer} from "@angular/material/sidenav";
import {DrawerService} from "../services/drawer.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  selectedIndex = 0;
  public status!: string;
  selectedPriority = -1;
  public priority!: string;
  user!: User | null;
  constructor(
    private ticketsService: TicketService,
    private router: Router,
    private userService: UserService,
    private drawerService : DrawerService
  ) {
  }

@ViewChild('drawer',{static: true } ) drawer!: MatDrawer;

  ngOnInit(): void {
    this.getUserById(LocalStorageService.getUserId()) ;
    this.drawerService.setDrawer(this.drawer);
    this.ticketsService.setSidebarComponent(this);
  }
  getUserById(userId: string | null):void {
    if (typeof userId === "string") {
      this.userService.getUserById(userId).subscribe({
        next: (user: User) => {
          this.user = user;
          console.log(this.user.path);
        },
        error: (error) => {
          console.log('Error: ' + error);
        }
      });
    }
  }


  public shownewTickets(status: string, priority: string): void {
    switch (status) {
      case 'All':
        this.selectedIndex = 0;
        break;
      case 'Open':
        this.selectedIndex = 1;
        break;
      case 'Pending':
        this.selectedIndex = 2;
        break;
      case 'In progress':
        this.selectedIndex = 3;
        break;
      case 'Closed':
        this.selectedIndex = 4;
        break;
      case 'Resolved':
        this.selectedIndex = 5;
        break;
      default:
        this.selectedIndex = -1;
    }
    switch (priority) {
      case 'Low' :
        this.selectedPriority = 0;
        break;
      case 'Medium' :
        this.selectedPriority = 1;
        break;
      case 'High' :
        this.selectedPriority = 2;
        break;
      case 'Urgent' :
        this.selectedPriority = 3;
        break;
      default:
        this.selectedPriority = -1;
    }
    this.status = status;
    this.priority = priority;
  }

}
