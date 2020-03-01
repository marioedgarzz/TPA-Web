package car_rentals

import "github.com/graphql-go/graphql"

var carBrands *graphql.Object

func GetCarBrandsType() *graphql.Object {
	if carBrands == nil {
		carBrands = graphql.NewObject(graphql.ObjectConfig{
			Name:        "CarBrands",
			Fields:      graphql.Fields{
				"CarBrandId": &graphql.Field{
					Type: graphql.Int,
				},
				"CarBrandName" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Car Brands",
		})
	}
	return carBrands
}