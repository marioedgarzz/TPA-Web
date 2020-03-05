package emailResolvers

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/models/email"
)

func SendEmail(p graphql.ResolveParams) (interface{}, error) {

	email.SendEmail()

	return nil, nil
}
