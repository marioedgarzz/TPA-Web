package userResolvers

import (
	"github.com/graphql-go/graphql"
	user "github.com/marioedgarzz/backend-tpa/models/user"
)

func CreateNewUser(p graphql.ResolveParams) (i interface{}, e error) {

	Username := p.Args["Username"].(string)
	UserEmail := p.Args["UserEmail"].(string)
	UserPassword := p.Args["UserPassword"].(string)
	UserPhoneNumber:= p.Args["UserPhoneNumber"].(string)

	users, err := user.CreateNewUser(Username,UserEmail,UserPassword,UserPhoneNumber)

	return users,err
}

func SetUserCurrency(p graphql.ResolveParams) (i interface{}, e error) {
	UserId := p.Args["UserId"].(int)
	UserCurrency := p.Args["UserCurrency"].(string)
	users, err := user.SetUserCurrency(UserId, UserCurrency)

	return users, err
}

func SetUserLanguage(p graphql.ResolveParams) (i interface{}, e error) {
	UserId := p.Args["UserId"].(int)
	UserLanguage := p.Args["UserLanguage"].(string)
	users, err := user.SetUserLanguage(UserId, UserLanguage)
	return users, err
}

func UpdateAccountData(p graphql.ResolveParams) (i interface{}, e error) {
	UserId := p.Args["UserId"].(int)
	UserTitle := p.Args["UserTitle"].(string)
	Username := p.Args["Username"].(string)
	UserAddress := p.Args["UserAddress"].(string)
	UserPostalCode := p.Args["UserPostalCode"].(string)
	UserCity := p.Args["UserCity"].(string)

	users, err := user.UpdateAccountData(UserId, UserTitle, Username, UserCity, UserAddress, UserPostalCode)

	return users, err
}