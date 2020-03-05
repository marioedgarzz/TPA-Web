package chatResolvers

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/models/chats"
)

func GetAllChatRoomsByAdminId(p graphql.ResolveParams) (interface{}, error) {

	AdminId := p.Args["AdminId"].(int)

	return chats.GetAllChatRoomsByAdminId(AdminId)
}

func GetAllChatRoomsByUserId(p graphql.ResolveParams) (interface{}, error) {

	UserId := p.Args["UserId"].(int)

	return chats.GetAllChatRoomsByUserId(UserId)
}

func GetAllChatsByRoomId(p graphql.ResolveParams) (interface{}, error) {

	RoomId := p.Args["RoomId"].(int)

	return chats.GetAllChatsByRoomId(RoomId)
}

func GetLastChatDetailByRoomId(p graphql.ResolveParams) (interface{}, error) {

	RoomId := p.Args["RoomId"].(int)

	return chats.GetLastChatDetailByRoomId(RoomId)
}
