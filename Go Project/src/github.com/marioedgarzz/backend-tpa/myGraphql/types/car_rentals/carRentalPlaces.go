package car_rentals

import "github.com/graphql-go/graphql"

var carRentalPlaces *graphql.Object

func GetCarRentalPlacesType() *graphql.Object {
	if carRentalPlaces == nil {
		carRentalPlaces = graphql.NewObject(graphql.ObjectConfig{
			Name:        "CarRentalPlaces",
			Fields:      graphql.Fields{
				"CarRentalPlaceId": &graphql.Field{
					Type: graphql.Int,
				},
				"CarRentalPlaceName" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Car Rental Places",
		})
	}
	return carRentalPlaces
}

