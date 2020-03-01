package promoResolvers

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/models/promo"
)

func GetAllPromos(p graphql.ResolveParams) (interface{}, error) {

	promos, err := promo.GetAllPromos()

	return promos, err
}
