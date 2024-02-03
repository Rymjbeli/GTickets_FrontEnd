import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginformComponent } from './loginform/loginform.component';
import {AuthGuard, noAuthGuard} from "./guards/no-auth-guard/no-auth.guard";
import {TicketDetailsComponent} from "./ticket-details/ticket-details.component";
import {SignupComponent} from "./signup/signup.component";
import {VerifyEmailComponent} from "./verify-email/verify-email.component";
import {EmailVerifiedComponent} from "./email-verified/email-verified.component";
import {signedUpGuard} from "./guards/email-verif.guard";
import {ResetPasswordComponent} from "./ResetPassword/reset-password/reset-password.component";
import {EmailSentComponent} from "./ResetPassword/email-sent/email-sent.component";
import {ResetSendingEmailComponent} from "./ResetPassword/reset-sending-email/reset-sending-email.component";
import {ResetSuccessComponent} from "./ResetPassword/reset-success/reset-success.component";
import {redirectionGuard} from "./guards/redirection.guard";
import {Error404Component} from "./error404/error404.component";

const routes: Routes = [
  {
    path:'',canActivate: [redirectionGuard],
    children: [
      { path: '', redirectTo: 'tickets/all', pathMatch: 'full' },
      { path: 'tickets/all', component: SidebarComponent},
      { path: 'ticketDetails/:id', component: TicketDetailsComponent},
    ]
  },
  { path: 'verifyEmail/:email', component: VerifyEmailComponent,canActivate: [signedUpGuard]},
  { path: 'verify-account', component: EmailVerifiedComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'email-sent/:email', component: EmailSentComponent},
  { path: 'reset-sending-email', component: ResetSendingEmailComponent},
  { path: 'reset-success', component: ResetSuccessComponent},

  { path: 'sign-in', component: LoginformComponent,canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignupComponent,canActivate: [AuthGuard]},
  { path: '**', component:Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
