import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ChatsService } from 'src/app/services/chats/chats.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  messageControl = new FormControl();
  messageLists: Array<any> = [];
  private roomId : number;

  constructor(private  chatService: ChatsService) { }

  ngOnInit() {
    this.chatService.listen("chat-detail").subscribe(msg => {
      this.roomId =+ msg
    })
    this.chatService.listen('chat').subscribe(m => {
      this.messageLists.push(m);
    });
  }

  sendMessage() {
    this.chatService.emit('chat', this.messageControl.value);
    this.messageControl.setValue("");
  }

}
