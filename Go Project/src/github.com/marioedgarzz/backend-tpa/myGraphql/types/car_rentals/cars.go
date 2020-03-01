package car_rentals

import "github.com/graphql-go/graphql"

var cars *graphql.Object

func GetCarsType() *graphql.Object {
	if cars == nil {
		cars = graphql.NewObject(graphql.ObjectConfig{
			Name:        "Cars",
			Fields:      graphql.Fields{
				"CarId": &graphql.Field{
					Type: graphql.Int,
				},
				"CarBrand" : &graphql.Field{
					Type: GetCarBrandsType(),
				},
				"CarModel" : &graphql.Field{
					Type: GetCarModelsType(),
				},
				"CarPicture" : &graphql.Field{
					Type: graphql.String,
				},
				"CarPassengerCapacity" : &graphql.Field{
					Type: graphql.Int,
				},
				"CarBaggageCapacity" : &graphql.Field{
					Type: graphql.Int,
				},
			},
			Description: "Get Cars",
		})
	}
	return cars
}
