package chatResolvers

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/models/chats"
)

func InsertNewRooms(p graphql.ResolveParams) (interface{}, error){
	AdminId := p.Args["AdminId"].(int)
	UserId := p.Args["UserId"].(int)
	ChatLocation := p.Args["ChatLocation"].(string)
	ChatPaymentName := p.Args["ChatPaymentName"].(string)
	ChatPaymentPrice := p.Args["ChatPaymentPrice"].(int)
	ChatPaymentStatus := p.Args["ChatPaymentStatus"].(string)

	return chats.InsertNewRooms(AdminId,UserId,ChatLocation,ChatPaymentName, ChatPaymentPrice,ChatPaymentStatus)
}

func UpdateAdminStatus(p graphql.ResolveParams) (interface{}, error){

	RoomId := p.Args["RoomId"].(int)
	Status := p.Args["Status"].(string)

	return chats.UpdateAdminStatus(RoomId, Status)
}

func UpdateUserStatus(p graphql.ResolveParams) (interface{}, error){
	RoomId := p.Args["RoomId"].(int)
	Status := p.Args["Status"].(string)

	return chats.UpdateUserStatus(RoomId, Status)
}


func SendMessage(p graphql.ResolveParams) (interface{}, error){

	//ChatRoomId int, SenderRole string, ReceiverRole string, contentMessage string, chatDateTime string
	RoomId := p.Args["RoomId"].(int)
	SenderRole := p.Args["SenderRole"].(string)
	ReceiverRole := p.Args["ReceiverRole"].(string)
	contentMessage := p.Args["ContentMessage"].(string)
	chatDateTime := p.Args["ChatDateTime"].(string)

	return chats.SendMessage(RoomId, SenderRole, ReceiverRole, contentMessage, chatDateTime)
}
