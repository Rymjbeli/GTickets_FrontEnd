import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth-service/auth.service";
import {LocalStorageService} from "../services/storage-service/local-storage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.scss']
})
export class EmailVerifiedComponent {
  email!: string;
  otp!: string;
  isVerified: boolean = false;
  buttonName!: string;

  constructor(
    private route: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.email = params['email'];
    //   this.otp = params['otp'];
    // });
    // this.verifyEmail();
    // localStorage.removeItem('isSignedUp');

    this.isVerified = true;

    if (LocalStorageService.tokenIsValid()) {
      this.buttonName = 'Return To Ticket Dashboard';
    } else {
      this.buttonName = 'Return To Sign In';
    }
  }

  // verifyEmail() {
  //   console.log(this.email);
  //   console.log(this.otp);
  //   this.AuthService.verifyEmail(this.email, this.otp).subscribe({
  //     next: (data: any) => {
  //       console.log(data);
  //       this.isVerified = true;
  //       // localStorage.setItem('emailVerified', 'true');
  //     },
  //     error: (error: any) => {
  //       console.log(error.status);
  //       this.toastr.error('Failed to verify email', 'Error', {disableTimeOut: true});
  //     }
  //   });
  // }

  enter() {
    if (LocalStorageService.tokenIsValid()) {
      this.router.navigate(['tickets/all']);
    } else {
      this.router.navigate(['sign-in']);
    }
  }

}
