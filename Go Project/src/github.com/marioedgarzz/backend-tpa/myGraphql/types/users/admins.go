package users

import "github.com/graphql-go/graphql"

var adminType *graphql.Object

func GetAdminTypes() *graphql.Object {
	if adminType == nil {
		adminType = graphql.NewObject(graphql.ObjectConfig{
			Name:        "AdminType",
			Fields:      graphql.Fields{
				"AdminId": &graphql.Field{
					Type:  graphql.Int,
				},
				"AdminUsername" : &graphql.Field{
					Type: graphql.String,
				},
				"AdminPassword" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Admin Types",
		})
	}
	return adminType
}
