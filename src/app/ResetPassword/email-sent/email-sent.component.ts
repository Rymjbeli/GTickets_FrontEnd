import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.scss']
})
export class EmailSentComponent {
  email!: string;
  constructor(
    private activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.email = params['email'];
    });

  }
}
