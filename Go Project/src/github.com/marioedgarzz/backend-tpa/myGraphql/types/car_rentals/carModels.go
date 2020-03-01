package car_rentals
import "github.com/graphql-go/graphql"

var carModels *graphql.Object

func GetCarModelsType() *graphql.Object {
	if carModels == nil {
		carModels = graphql.NewObject(graphql.ObjectConfig{
			Name:        "CarModels",
			Fields:      graphql.Fields{
				"CarModelId": &graphql.Field{
					Type: graphql.Int,
				},
				"CarModelName" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Car Models",
		})
	}
	return carModels
}
