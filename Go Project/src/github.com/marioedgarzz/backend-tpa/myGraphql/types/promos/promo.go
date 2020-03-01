package promos

import "github.com/graphql-go/graphql"

var promoType *graphql.Object

func GetTypes() *graphql.Object {
	if promoType == nil {
		promoType = graphql.NewObject(graphql.ObjectConfig{
			Name:        "PromoType",
			Fields:      graphql.Fields{
				"PromoId": &graphql.Field{
					Type:  graphql.Int,
				},
				"PromoHeader" : &graphql.Field{
					Type: graphql.String,
				},
				"PromoPicture" : &graphql.Field{
					Type: graphql.String,
				},
				"PromoDescription" : &graphql.Field{
					Type: graphql.String,
				},
				"PromoPeriod" : &graphql.Field{
					Type: graphql.String,
				},
				"PromoTripPeriod" : &graphql.Field{
					Type: graphql.String,
				},
				"PromoPlatform" : &graphql.Field{
					Type: graphql.String,
				},
				"PromoCode" : &graphql.Field{
					Type: graphql.String,
				},
				"PromoCodeDescription" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Promo Types",
		})
	}
	return promoType
}
