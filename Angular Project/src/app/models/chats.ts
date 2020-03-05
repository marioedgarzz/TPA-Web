import { Users, Admins } from './types'

export class ChatRooms {
	ChatRoomId : number 
	Admin : Admins
	User : Users
	ChatLocation : string
	ChatPaymentName : string
	ChatPaymentPrice : number
	ChatPaymentStatus : string
	ChatRoomAdminStatus : string //starred , archieved, default
	ChatRoomUserStatus :  string
	ChatRoomAdminRead : boolean
	ChatRoomUserRead : boolean
}

export class ChatDetails{
	ChatDetailsId : number 
	ChatRoom : ChatRooms 
	ChatRoomId : number
	ChatSender : string
	ChatReceiver : string
	ChatContent : string
	ChatDateTime : string
}
