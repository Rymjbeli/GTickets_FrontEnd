import { Component } from '@angular/core';
import {
  AbstractControl, FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ResetPasswordService} from "../../services/ResetPassword/reset-password.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  resetPasswordForm!: FormGroup;
  email!: string;
  otp!: string;
  constructor(
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: ResetPasswordComponent.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.otp = params['token'];

    });
  }
  static passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  };
  resetPassword(resetPasswordFormulaire:  FormGroup) {
    const newPassword = resetPasswordFormulaire.value.password;
    this.resetPasswordService.resetPassword(this.email, newPassword, this.otp).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/reset-success']);
      },
      (error: any) => {
        console.log(error);
        if(error.status === 400){
          this.toastr.error("Failed to reset password");
        }
      }
    );

  }
}
