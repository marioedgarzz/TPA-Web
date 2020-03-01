package car_rentals

import "github.com/graphql-go/graphql"

var carFromVendors *graphql.Object

func GetCarFromVendorsType() *graphql.Object {
	if carFromVendors == nil {
		carFromVendors = graphql.NewObject(graphql.ObjectConfig{
			Name:        "CarFromVendors",
			Fields:      graphql.Fields{
				"CarFromVendorId": &graphql.Field{
					Type: graphql.Int,
				},
				"Car" : &graphql.Field{
					Type: GetCarsType(),
				},
				"CarVendor" : &graphql.Field{
					Type: GetCarVendorsType(),
				},
				"CarPrice" : &graphql.Field{
					Type: graphql.Int,
				},
				"CarRentalPlaces" : &graphql.Field{
					Type: GetCarRentalPlacesType(),
				},
			},
			Description: "Get Car From Vendors",
		})
	}
	return carFromVendors
}
