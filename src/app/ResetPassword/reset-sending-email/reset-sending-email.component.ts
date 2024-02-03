import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ResetPasswordService} from "../../services/ResetPassword/reset-password.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reset-sending-email',
  templateUrl: './reset-sending-email.component.html',
  styleUrls: ['./reset-sending-email.component.scss']
})
export class ResetSendingEmailComponent {
  constructor(
    private resetPasswordService: ResetPasswordService,
    private Http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  forgotPassword(sendEmailForm: NgForm) {
    const email = sendEmailForm.value.email;
    console.log(email);
    this.resetPasswordService.forgotPassword(email).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/email-sent',email]);
      },
      (error: any) => {
        console.log(error);
        this.toastr.error("No user found with this email ");
      }
    );

  }
}
