import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ChatRooms, ChatDetails } from 'src/app/models/chats';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  socket: any;
  readonly uri: string = 'ws://localhost:4300';

  constructor(private apollo : Apollo) {
    this.socket = io(this.uri);
  }

  public listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  public emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  insertNewChatRooms(adminId : number, userId : number, chatLocation : string, chatPaymentName : string,
    chatPaymentPrice : number, chatPaymentStatus : string) : Observable<any>{
      return this.apollo.mutate<any> ({
        mutation : gql `
          mutation insertNewChatRoom($adminId : Int, $userId : Int, $chatLocation : String,
            $chatPaymentName : String, $chatPaymentPrice : Int, $chatPaymentStatus : String) {
            insertNewChatRoom(AdminId : $adminId, UserId : $userId, ChatLocation: $chatLocation,
            ChatPaymentName : $chatPaymentName , ChatPaymentPrice : $chatPaymentPrice,
            ChatPaymentStatus : $chatPaymentStatus) {
              ChatRoomId
            }
          }
        `,
        variables : {
          "adminId": adminId,
          "userId": userId,
          "chatLocation": chatLocation,
          "chatPaymentName": chatPaymentName,
          "chatPaymentPrice": chatPaymentPrice,
          "chatPaymentStatus": chatPaymentStatus
        }
      })
    }

    updateUserStatus(roomId : number, status : string) : Observable<any>{
      return this.apollo.mutate<any> ({
        mutation : gql `
          mutation UpdateUserStatus($roomId : Int, $status : String){
            UpdateUserStatus(RoomId : $roomId, Status : $status) {
              ChatRoomAdminStatus
              ChatRoomUserStatus
            }
          }
        `,
        variables : {
          "roomId": roomId,
          "status": status
        }
      })
    }

    updateAdminStatus(roomId : number, status : string) : Observable<any>{
      return this.apollo.mutate<any> ({
        mutation : gql `
          mutation UpdateAdminStatus($roomId : Int, $status : String){
            UpdateAdminStatus(RoomId : $roomId, Status : $status) {
              ChatRoomAdminStatus
              ChatRoomUserStatus
            }
          }
        `,
        variables : {
          "roomId": roomId,
          "status": status
        }
      })
    }

    sendMessage(roomId : number, senderRole : string, receiverRole : string, contentMessage : string,
      chatDateTime : string) : Observable<any>{
      return this.apollo.mutate<any>({
        mutation : gql `
          mutation SendMessage($roomId : Int, $senderRole : String, $receiverRole : String,
            $contentMessage : String, $chatDateTime : String){
            SendMessage(RoomId : $roomId, SenderRole : $senderRole , ReceiverRole : $receiverRole,
            ContentMessage : $contentMessage, ChatDateTime : $chatDateTime) {
              ChatContent
            }
          }
        `,
        variables : {
            "roomId": roomId,
            "senderRole": senderRole,
            "receiverRole": receiverRole,
            "contentMessage": contentMessage,
            "chatDateTime": chatDateTime
        }
      })
    }

    getAllChatsByRoomId(roomId : number) : Observable<ChatDetails[]> {
      return this.apollo.watchQuery<any>({
        query : gql `
          query getAllChatsByRoomId ($roomId : Int){
            getAllChatsByRoomId (RoomId : $roomId) {
              ChatContent
              ChatDateTime
              ChatDetailsId
              ChatReceiver
              ChatRoom {
                Admin {
                  AdminId
                  AdminPassword
                  AdminUsername
                }
                ChatLocation
                ChatPaymentName
                ChatPaymentPrice
                ChatPaymentStatus
                ChatRoomAdminRead
                ChatRoomAdminStatus
                ChatRoomId
                ChatRoomUserRead
                ChatRoomUserStatus
                User {
                  UserAddress
                  UserCity
                  UserCurrency
                  UserEmail
                  UserId
                  UserLanguage
                  UserPassword
                  UserPhoneNumber
                  UserPostalCode
                  UserTitle
                  Username
                }
              }
              ChatSender
            }
          }
        `,
        variables : {
          "roomId" : roomId
        }
      }).valueChanges.pipe(
        map(res => res.data.getAllChatsByRoomId)
      )
    }

    getLastChatDetailByRoomId(RoomId : number) : Observable<ChatDetails[]>{
      return this.apollo.watchQuery<any>({
        query : gql `
          query GetLastChatDetailByRoomId($roomId : Int){
            GetLastChatDetailByRoomId(RoomId : $roomId){
              ChatContent
              ChatDateTime
            }
          }
        `,
        variables : {
          "roomId" : RoomId
        }
      }).valueChanges.pipe(
        map(res => res.data.getLastChatDetailByRoomId)
      )
    }

    getAllChatRoomsByUserId(userId : number) : Observable<ChatRooms[]> {
      return this.apollo.watchQuery<any>({
        query : gql `
          query getAllChatRoomsByUserId ($userId : Int){
            getAllChatRoomsByUserId(UserId : $userId) {
              Admin {
                AdminId
                AdminPassword
                AdminUsername
              }
              ChatLocation
              ChatPaymentName
              ChatPaymentPrice
              ChatPaymentStatus
              ChatRoomAdminRead
              ChatRoomAdminStatus
              ChatRoomId
              ChatRoomUserRead
              User {
                UserAddress
                UserCity
                UserCurrency
                UserEmail
                UserId
                UserLanguage
                UserPassword
                UserPhoneNumber
                UserPostalCode
                UserTitle
                Username
              }
              ChatRoomUserStatus
            }
          }
        `,
        variables : {
          "userId" : userId
        }
      }).valueChanges.pipe(
        map(res => res.data.getAllChatRoomsByUserId)
      )
    }

    sendEmail() : Observable<any>{
      return this.apollo.query<any>({
        query : gql `
          query {
            sendEmail 
          }
        `
      })
    }

    getAllChatRoomsByAdminId(adminId : number) : Observable<ChatRooms[]> {
      return this.apollo.watchQuery<any>({
        query : gql `
          query getAllChatRoomsByAdminId($adminId : Int) {
            getAllChatRoomsByAdminId(AdminId : $adminId) {
              Admin {
                AdminId
                AdminPassword
                AdminUsername
              }
              ChatLocation
              ChatPaymentName
              ChatPaymentPrice
              ChatPaymentStatus
              ChatRoomAdminRead
              ChatRoomAdminStatus
              ChatRoomId
              ChatRoomUserRead
              User {
                UserAddress
                UserCity
                UserCurrency
                UserEmail
                UserId
                UserLanguage
                UserPassword
                UserPhoneNumber
                UserPostalCode
                UserTitle
                Username
              }
              ChatRoomUserStatus
            }
          }
        `,
        variables : {
          "adminId" : adminId
        }
      }).valueChanges.pipe(
        map(res => res.data.getAllChatRoomsByAdminId)
      )
    }
}
