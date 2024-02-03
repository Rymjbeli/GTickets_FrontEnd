import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth-service/auth.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  email!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.email = params['email'];
    });
    // const emailVerified = localStorage.getItem('emailVerified');
    // if (emailVerified === 'true') {
    //   // localStorage.removeItem('emailVerified');
    //   this.router.navigate(['/sign-in']);
    // }
  }

   regenerateOtp(email: string){
    console.log(email);
    this.AuthService.regenerateOtp(email).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Failed to send verification email');
      }
    });
  }
}
