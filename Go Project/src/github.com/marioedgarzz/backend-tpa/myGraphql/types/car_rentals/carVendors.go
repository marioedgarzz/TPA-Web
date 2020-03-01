package car_rentals

import "github.com/graphql-go/graphql"

var carVendors *graphql.Object

func GetCarVendorsType() *graphql.Object {
	if carVendors == nil {
		carVendors = graphql.NewObject(graphql.ObjectConfig{
			Name:        "CarVendors",
			Fields:      graphql.Fields{
				"CarVendorId": &graphql.Field{
					Type: graphql.Int,
				},
				"CarVendorName" : &graphql.Field{
					Type: graphql.String,
				},
				"CarVendorPicture" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Car Vendors",
		})
	}
	return carVendors
}
