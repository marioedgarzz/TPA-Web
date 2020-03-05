package userResolvers

import (
	"github.com/graphql-go/graphql"
	user2 "github.com/marioedgarzz/backend-tpa/models/user"
)
func GetAllUsers(p graphql.ResolveParams) (i interface{}, e error) {
	user, err := user2.GetAllUsers()

	return user, err
}

func GetUserByPhoneOrEmail(p graphql.ResolveParams) (i interface{}, e error){

	userOrEmail := p.Args["emailOrPhone"].(string)

	user, err := user2.GetUserByPhoneOrEmail(userOrEmail)

	return user, err
}

func GetUserById(p graphql.ResolveParams) (i interface{}, e error) {

	id := p.Args["id"].(int)

	user, err := user2.GetUserById(id)

	return user, err

}

func GetAdminByUsernameAndPassword(p graphql.ResolveParams) (i interface{}, e error) {

	AdminUsername := p.Args["AdminUsername"].(string)
	AdminPassword := p.Args["AdminPassword"].(string)
	user, err := user2.GetAdminByUsernameAndPassword(AdminUsername,AdminPassword)

	return user, err

}

func GetAdminById(p graphql.ResolveParams) (i interface{}, e error) {

	AdminId := p.Args["AdminId"].(int)
	user, err := user2.GetAdminById(AdminId)

	return user, err

}


func GetUserByFacebookKey(p graphql.ResolveParams) (interface{}, error) {
	FacebookKey := p.Args["FacebookKey"].(string)

	return user2.GetUserByFacebookKey(FacebookKey)
}

func GetUserByGoogleKey(p graphql.ResolveParams) (interface{}, error) {
	GoogleKey := p.Args["GoogleKey"].(string)

	return user2.GetUserByGoogleKey(GoogleKey)
}