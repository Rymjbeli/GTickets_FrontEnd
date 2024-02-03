import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth-service/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  showPassword: boolean = false;
  selectedFile!: File;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    // private EmailVerificationService: EmailVerificationService,
  )
  {
  }

  signup(signupFormulaire: NgForm) {
    console.log(signupFormulaire.value);
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('userName', signupFormulaire.value.userName);
    formData.append('email', signupFormulaire.value.email);
    formData.append('password', signupFormulaire.value.password);
    this.authService.signup(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.success('Account created successfully', '', {timeOut: 3000});
        this.router.navigate(['verifyEmail', signupFormulaire.value.email]);
        localStorage.setItem('isSignedUp', 'true');
        // localStorage.removeItem('emailVerified');
        //   setTimeout(() => {
        //     this.toastr.info('Please login to continue');
        //   }, 2000);
      },
      error: (error: any) => {
        console.log(error.status);
        if (error.status == 403) {
          console.log(error);
          this.toastr.error(error.error?.message, '', {timeOut: 3000});
        }
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
