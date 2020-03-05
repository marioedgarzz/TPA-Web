import { Component, OnInit } from '@angular/core';
import { ChatsService } from 'src/app/services/chats/chats.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { Router } from '@angular/router';
import { ChatRooms, ChatDetails } from 'src/app/models/chats';
import { GraphqlUsersService } from 'src/app/services/graphql-users.service';
import { ServerNotifyService } from 'src/app/services/chats/server-notify.service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit {

  constructor(private chatService : ChatsService,
    private router : Router,
    private userService : GraphqlUsersService,
    private serverService : ServerNotifyService ) { }

  private chatRooms : ChatRooms[];
  private currentRole : string;
  private users : string[];
  private userInitials : string[];
  private filters : string = "All"
  private lastMsg : string[]
  private lastOccurence : string[]
  private assignMessages () {
    this.lastMsg = Array(this.chatRooms.length)
    this.lastOccurence = Array(this.chatRooms.length)
    for(let i = 0 ; i < this.chatRooms.length ; i++) {
      this.assign(i)
    }
  }

  private assign(idx : number) {
    this.chatService.getLastChatDetailByRoomId(this.chatRooms[idx].ChatRoomId).subscribe(
      async result => {
        await (this.lastOccurence[idx] = result[0].ChatDateTime,
          this.lastMsg[idx] = result[0].ChatContent)
      }
    )
  }
  ngOnInit() {
    if(UserStorageService.getCurrentUserId() != 0) {
      this.currentRole = "User"
      this.chatService.getAllChatRoomsByUserId(UserStorageService.getCurrentUserId()).subscribe(
        async result => {
          await (this.chatRooms = result,
            this.assignMessages(),
            console.log(this.chatRooms),
            this.getInitials())
        }
      )
    }
    else if(UserStorageService.getCurrentAdmin() != 0) {
      this.currentRole = "Admin"
      this.chatService.getAllChatRoomsByAdminId(UserStorageService.getCurrentAdmin()).subscribe(
        async result => {
          await (this.chatRooms = result,
            this.getInitials())
        }
      )
    }
    else {
      alert("You must log in first!")
      this.router.navigate(["/"])
    }
  }

  archieve(item : ChatRooms) {
    if(this.currentRole == "Admin") {
      this.chatService.updateUserStatus(item.ChatRoomId,"Archieved").subscribe(
        async result => {
          await (alert("Archieved"), location.reload())
        }
      )
    }
    else {
      console.log(item.ChatRoomAdminStatus)
      this.chatService.updateAdminStatus(item.ChatRoomId,"Archieved").subscribe(
        async result => {
          await (alert("Archieved"), location.reload())
        }
      )
    }
  }

  isStarred(item : ChatRooms) {
     if(this.currentRole == "Admin") {
        return item.ChatRoomUserStatus == "Starred";
     }
     else {
       return item.ChatRoomAdminStatus == "Starred"
     }
  }

  isArchieved(item : ChatRooms) {
    if(this.currentRole == "Admin") {
       return item.ChatRoomUserStatus == "Archieved";
    }
    else {
      return item.ChatRoomAdminStatus == "Archieved"
    }
 }

  star(item : ChatRooms) {
    if(this.currentRole == "Admin") {
      this.chatService.updateUserStatus(item.ChatRoomId,"Starred").subscribe(
        async result => {
          await (alert("Starred"), location.reload())
        }
      )
    }
    else {
      console.log(item.ChatRoomAdminStatus)
      this.chatService.updateAdminStatus(item.ChatRoomId,"Starred").subscribe(
        async result => {
          await (alert("Starred"), location.reload())
        }
      )
    }
  }

  chatDetail(item : ChatRooms) {
    this.serverService.emit("chat-detail", item.ChatRoomId)
  }

  isUnread(item : ChatRooms) {
    return (this.currentRole == "Admin" && item.ChatRoomAdminRead == false) ||
    (this.currentRole == "User" && item.ChatRoomUserRead == false)
  }

  getInitials() {

    this.userInitials = Array(this.chatRooms.length);
    this.users = Array(this.chatRooms.length)
    for(let i = 0 ; i < this.chatRooms.length; i++) {
      if(this.currentRole == "Admin") {
        this.userInitials[i] = this.getInit(this.chatRooms[i].User.Username)
        this.users[i] = this.chatRooms[i].User.Username
      }
      else {
        this.userInitials[i] = this.getInit(this.chatRooms[i].Admin.AdminUsername)
        this.users[i] = this.chatRooms[i].Admin.AdminUsername
      }
      
    }
  }

  getInit(res : string) {
    var name : string[] = res.split(" ")
    var firstChar = name[0].charAt(0)
    var secondChar = name[1].charAt(0)
    return firstChar + "" + secondChar
  }

}
