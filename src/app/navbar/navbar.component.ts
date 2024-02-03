import {Component, Input} from '@angular/core';
import {User} from "../models/User";
import {TicketService} from "../services/ticket.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {LocalStorageService} from "../services/storage-service/local-storage.service";
import {DrawerService} from "../services/drawer.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  selectedIndex = 0;
  public status!: string;
  user!: User | null;
  @Input() inDetails: boolean = true;
  serverUrl = 'https://localhost:44353/';
  public userImagePath!:string;

  constructor(
    private ticketsService: TicketService,
    private router: Router,
    private userService: UserService,
    private drawerService: DrawerService
  ) {
  }

  ngOnInit(): void {
    localStorage.removeItem('isSignedUp');
    this.getUserById(LocalStorageService.getUserId()) ;
  }
  toggleDrawer() {
    this.drawerService.toggleDrawer();
    console.log(this.user?.path);

  }
  getUserById(userId: string | null):void {
    if (typeof userId === "string") {
      this.userService.getUserById(userId).subscribe({
        next: (user: User) => {
          this.user = user;
          this.userImagePath = this.serverUrl + this.user.path;
          console.log(user);
        },
        error: (error) => {
          console.log('Error: ' + error);
        }
      });
    }
  }



//
// // ...
//
//   getUserById(userId: number | null): void {
//     if (typeof userId === "number") {
//       this.userService.getUserById(userId).subscribe({
//         next: (user: User) => {
//           this.user = user;
//           // Update the image source path
//           this.userImagePath = serverUrl + imagePath + this.user.path;
//         },
//         error: (error) => {
//           console.log('Error: ' + error);
//         }
//       });
//     }
//     <img *ngIf="user?.path" [src]="userImagePath" alt="User Avatar" class="rounded-circle" />

    logout() {
    this.router.navigate(['sign-in']);
    LocalStorageService.signOut();
  }

}
