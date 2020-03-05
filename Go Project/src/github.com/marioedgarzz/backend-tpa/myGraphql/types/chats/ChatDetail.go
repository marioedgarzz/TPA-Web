package chats

/*
type ChatDetails struct {
	ChatDetailsId int `gorm:"primary_key:auto_increment"`
	ChatRoom ChatRooms `gorm:"foreign_key:chat_room_id"`
	ChatRoomId int
	ChatSender string
	ChatReceiver string
	ChatContent string
	ChatDateTime string
}
 */

import "github.com/graphql-go/graphql"

var chatDetailTypes *graphql.Object

func GetChatDetailTypes() *graphql.Object {
	if chatDetailTypes == nil {
		chatDetailTypes = graphql.NewObject(graphql.ObjectConfig{
			Name:        "ChatDetailType",
			Fields:      graphql.Fields{
				"ChatDetailsId": &graphql.Field{
					Type:  graphql.Int,
				},
				"ChatRoom" : &graphql.Field{
					Type: GetTypes(),
				},
				"ChatSender" : &graphql.Field{
					Type: graphql.String,
				},
				"ChatReceiver" : &graphql.Field{
					Type: graphql.String,
				},
				"ChatContent" : &graphql.Field{
					Type: graphql.String,
				},
				"ChatDateTime" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Chat Detail Types",
		})
	}
	return chatDetailTypes
}
