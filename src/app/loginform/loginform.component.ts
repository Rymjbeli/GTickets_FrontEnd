import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth-service/auth.service";
import { ToastrService } from 'ngx-toastr';
import {LocalStorageService} from "../services/storage-service/local-storage.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent {
  showPassword: boolean = false;
  rememberMe: boolean = false;

  ngOnInit(): void {
    console.log(LocalStorageService.tokenIsValid())
  }
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) { }

  login(authenticationrequest: NgForm) {
    const email:string = authenticationrequest.value.email;
    const password:string = authenticationrequest.value.password;
    this.authService.login(email, password, this.rememberMe).subscribe(
      (data: any) => {
        // console.log('data ',data);
        this.toastr.success('Login successful','', {timeOut: 3000});
        // this.router.navigate(['tickets/all']);
        // console.log('id ',LocalStorageService.getUserId());
        this.isVerified(LocalStorageService.getUserId(),email);
      },
      (error: any) => {
        console.log(error);
        this.toastr.error('Email or Password Incorrect','Login failed',{timeOut: 3000});
      }
    );
  }

  isVerified(id: string | null,email: string){
    this.userService.isVerified(id).subscribe({
      next: (data: any) => {
        console.log("daataa", data);
        if (data == true) {
          console.log('verified');
          this.router.navigate(['tickets/all']);
        }
        else {
          console.log('not verified');
          this.router.navigate(['verifyEmail', email]);
          this.regenerateOtp(email);
        }
      },
      error: (error: any) => {
        console.log(error.status);
      }
    });
  }
  regenerateOtp(email: string){
    console.log(email);
    this.authService.regenerateOtp(email).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error.status);
      }
    });
  }
}
