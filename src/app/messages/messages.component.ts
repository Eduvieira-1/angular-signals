import { MessagesService } from './messages.service';
import {Component, inject, signal} from "@angular/core";
import {NgClass} from "@angular/common";

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  imports: [
    NgClass
  ],
  standalone: true
})
export class MessagesComponent {

  messagesService = inject(MessagesService);

  message = this.messagesService.message;

  onClose(){
    this.messagesService.clear()
  }

}
