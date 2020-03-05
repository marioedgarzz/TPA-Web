package users

import "github.com/graphql-go/graphql"

var userType *graphql.Object

func GetTypes() *graphql.Object {
	if userType == nil {
		userType = graphql.NewObject(graphql.ObjectConfig{
			Name:        "UserType",
			Fields:      graphql.Fields{
				"UserId": &graphql.Field{
					Type:  graphql.Int,
				},
				"Username" : &graphql.Field{
					Type: graphql.String,
				},
				"UserEmail" : &graphql.Field{
					Type: graphql.String,
				},
				"UserPassword" : &graphql.Field{
					Type: graphql.String,
				},
				"UserPhoneNumber" : &graphql.Field{
					Type: graphql.String,
				},
				"UserCurrency" : &graphql.Field{
					Type: graphql.String,
				},
				"UserLanguage" : &graphql.Field{
					Type: graphql.String,
				},
				"UserCity" : &graphql.Field{
					Type: graphql.String,
				},
				"UserAddress" : &graphql.Field{
					Type: graphql.String,
				},
				"UserPostalCode" : &graphql.Field{
					Type: graphql.String,
				},
				"UserTitle" : &graphql.Field{
					Type: graphql.String,
				},
				"UserSubscription" : &graphql.Field{
					Type: graphql.Boolean,
				},
				"UserGoogleKey" : &graphql.Field{
					Type: graphql.String,
				},
				"UserFacebookKey" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get User Types",
		})
	}
	return userType
}
