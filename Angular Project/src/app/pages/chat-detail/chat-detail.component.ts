import { Component, OnInit } from '@angular/core';
import { ServerNotifyService } from 'src/app/services/chats/server-notify.service';
import { ChatDetails } from 'src/app/models/chats';
import { ChatsService } from 'src/app/services/chats/chats.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { GraphqlUsersService } from 'src/app/services/graphql-users.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ZoomPageComponent } from '../zoom-page/zoom-page.component';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit {

  private roomId : number;
  private chatList : ChatDetails[];
  private currRole : string;
  constructor(private serverService : ServerNotifyService,
    private chatService : ChatsService,
    private userService : GraphqlUsersService,
    private dialog : MatDialog) { }

  private senderInitial : string;
  private receiverInitial : string;
  private fileImg : string;
  ngOnInit() {
    this.serverService.listen("chat-detail").subscribe(msg => {
      this.roomId =+ msg
      this.chatService.getAllChatsByRoomId(this.roomId).subscribe(
        async result => {
          await (this.chatList = result,
            console.log(result),
            console.log(this.roomId),
            this.assign())
        }
      )
    })

  }

  getInit(res : string) {
    var name : string[] = res.split(" ")
    var firstChar = name[0].charAt(0)
    var secondChar = name[1].charAt(0)
    return firstChar + "" + secondChar
  }

  assign() {
    console.log("Ass value")
    if(UserStorageService.getCurrentUserId() != 0) {
      this.currRole = "User";
      this.senderInitial = this.getInit(this.chatList[0].ChatRoom.User.Username)
      this.receiverInitial = this.getInit(this.chatList[0].ChatRoom.Admin.AdminUsername)
    }
    else if(UserStorageService.getCurrentAdmin() != 0) {
      this.currRole = "Admin"
      this.receiverInitial = this.getInit(this.chatList[0].ChatRoom.User.Username)
      this.senderInitial = this.getInit(this.chatList[0].ChatRoom.Admin.AdminUsername)
    }
  }

  txtMsg : string = ""

  sendMsg() {
    if(this.txtMsg == "" || this.txtMsg == undefined) {
      return;
    }
    this.serverService.emit("chat",this.txtMsg)
    if(UserStorageService.getCurrentUserId() != 0) {
      this.chatService.sendMessage(this.roomId,"User","Admin",this.txtMsg,new Date().toLocaleString()).subscribe(
        async result => {
          await this.refresh(this.txtMsg)
        }
      )
    }
    else {
      this.chatService.sendMessage(this.roomId,"Admin","User",this.txtMsg,new Date().toLocaleString()).subscribe(
        async result => {
          await this.refresh(this.txtMsg)
        }
      )
    }
  }

  sendPict() {

    this.serverService.emit("chat",this.fileImg)

    console.log(this.fileImg)
    // const fileName = this.fileImg.split("\\")

    this.serverService.emit("chat",this.fileImg)
    if(UserStorageService.getCurrentUserId() != 0) {
      this.chatService.sendMessage(this.roomId,"User","Admin",this.fileImg,new Date().toLocaleString()).subscribe(
        async result => {
          await this.refresh(this.fileImg)
        }
      )
    }
    else {
      this.chatService.sendMessage(this.roomId,"Admin","User",this.fileImg,new Date().toLocaleString()).subscribe(
        async result => {
          await this.refresh(this.fileImg)
        }
      )
    }
  }

  onFileChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0]: e.target.files[0];
    var pattern = /image-*/;

    var reader = new FileReader()

    if(!file.type.match(pattern)){
      alert("invalid format");
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file)
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.fileImg = reader.result;
    this.sendPict()
  }

  checkType(item : ChatDetails) {
    if(item.ChatContent.endsWith(".png") || item.ChatContent.endsWith(".jpg")) {
      return "image"
    }
    else {
      return "message"
    }
  }

  refresh(str : string) {
    var c = new ChatDetails()
    c.ChatContent = str;
    if(UserStorageService.getCurrentUserId() != 0) {
      c.ChatSender = "User";
      c.ChatReceiver = "Admin";
    }
    else {
      c.ChatSender = "Admin";
      c.ChatReceiver = "User";
    }
    c.ChatDateTime = new Date().toLocaleString()
    this.chatList.push(c)
    console.log("refer")
  }

  // (click)="zoomImage(item)"

  zoomImage(item: ChatDetails) {
    var config : MatDialogConfig = new MatDialogConfig()

    config.data = {
      img : item.ChatContent
    }
    config.width = "90%"
    config.backdropClass="backdropColor";
    config.panelClass="panelColor";
    config.height = "100%"

    this.dialog.open(ZoomPageComponent,config)
  }

  checkSender(item : ChatDetails) {
    if(UserStorageService.getCurrentUserId() != 0) {
      //now logged in as user
      return (item.ChatSender == "User") 
    }
    else if (UserStorageService.getCurrentAdmin() != 0) {
      //now logged in as admin
      return (item.ChatSender == "Admin")
    }
  }
  
  checkReceiver(item : ChatDetails) {
    return !this.checkSender(item)
  }

}
