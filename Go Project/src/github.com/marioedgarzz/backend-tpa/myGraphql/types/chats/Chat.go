package chats

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/users"
)

var chatRoomType *graphql.Object

func GetTypes() *graphql.Object {
	if chatRoomType == nil {
		chatRoomType = graphql.NewObject(graphql.ObjectConfig{
			Name:        "ChatRoomType",
			Fields:      graphql.Fields{
				"ChatRoomId": &graphql.Field{
					Type:  graphql.Int,
				},
				"Admin" : &graphql.Field{
					Type: users.GetAdminTypes(),
				},
				"User" : &graphql.Field{
					Type: users.GetTypes(),
				},
				"ChatLocation" : &graphql.Field{
					Type: graphql.String,
				},
				"ChatPaymentName" : &graphql.Field{
					Type: graphql.String,
				},
				"ChatPaymentPrice" : &graphql.Field{
					Type: graphql.Int,
				},
				"ChatPaymentStatus" : &graphql.Field{
					Type: graphql.String,
				},
				"ChatRoomAdminStatus" : &graphql.Field{
					Type: graphql.String,
				},
				"ChatRoomUserStatus" : &graphql.Field{
					Type: graphql.String,
				},
				"ChatRoomAdminRead" : &graphql.Field{
					Type: graphql.Boolean,
				},
				"ChatRoomUserRead" : &graphql.Field{
					Type: graphql.Boolean,
				},
			},
			Description: "Get Chat Types",
		})
	}
	return chatRoomType
}
