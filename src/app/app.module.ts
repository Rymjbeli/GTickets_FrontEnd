import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginformComponent } from './loginform/loginform.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { ReplyItemComponent } from './reply-item/reply-item.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CapitalizeFirstWordPipe } from './pipe/capitalize-first-word.pipe';
import { HelpdeskTableComponent } from './helpdesk-table/helpdesk-table.component';
import {MatInputModule} from "@angular/material/input";
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { MatDialogModule} from "@angular/material/dialog";
import { CreatePopUpComponent } from './create-pop-up/create-pop-up.component';
import { MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from "@angular/material/list";
import {MatSortModule} from "@angular/material/sort";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";

import { SignupComponent } from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { ResetSendingEmailComponent } from './ResetPassword/reset-sending-email/reset-sending-email.component';
import { EmailSentComponent } from './ResetPassword/email-sent/email-sent.component';
import { ResetPasswordComponent } from './ResetPassword/reset-password/reset-password.component';
import { ResetSuccessComponent } from './ResetPassword/reset-success/reset-success.component';
import { Error404Component } from './error404/error404.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    AppComponent,
    LoginformComponent,
    TicketDetailsComponent,
    ReplyItemComponent,
    CapitalizeFirstWordPipe,
    AppComponent,
    HelpdeskTableComponent,
    SidebarComponent,
    CreatePopUpComponent,
    NavbarComponent,
    VerifyEmailComponent,
    EmailVerifiedComponent,
    ResetSendingEmailComponent,
    EmailSentComponent,
    ResetPasswordComponent,
    ResetSuccessComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,

    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: true,
    }),
    ReactiveFormsModule,
  ],
  providers: [
    HelpdeskTableComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
