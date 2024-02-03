import { Component } from '@angular/core';
import {LocalStorageService} from "./services/storage-service/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GestTickets_FrontEnd';
}
