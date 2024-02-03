import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Reply} from "../models/Reply";
import {LocalStorageService} from "../services/storage-service/local-storage.service";
import {ReplyService} from "../services/reply.service";

@Component({
  selector: 'app-reply-item',
  templateUrl: './reply-item.component.html',
  styleUrls: ['./reply-item.component.scss']
})
export class ReplyItemComponent implements OnInit{
  @Input() Reply!: Reply;
  @Output() replyDeleted = new EventEmitter();
  hasPermission: boolean = false;
  serverUrl = 'https://localhost:44353/';
  public userImagePath!:string;
  constructor(
    private replyService: ReplyService ) { }

  ngOnInit(): void {
    if(this.Reply.user.id == LocalStorageService.getUserId()
      // || LocalStorageService.isAdminLoggedIn()
    ){
      this.hasPermission = true;
    }
    this.userImagePath = this.serverUrl + this.Reply.user.path;
  }

  deleteReply() {
    this.replyService.deleteReply(this.Reply.id).subscribe({
      next: (data: any) => {
        this.replyDeleted.emit();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
