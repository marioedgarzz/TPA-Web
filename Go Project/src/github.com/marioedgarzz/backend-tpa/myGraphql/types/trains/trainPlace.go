package trains

import "github.com/graphql-go/graphql"

var trainPlaces *graphql.Object

func GetTrainPlaces() *graphql.Object {
	if trainPlaces == nil {
		trainPlaces = graphql.NewObject(graphql.ObjectConfig{
			Name:        "TrainPlace",
			Fields:      graphql.Fields{
				"TrainPlaceId" : &graphql.Field{
					Type:  graphql.Int,
				},
				"TrainPlaceName" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Train Destination or Source",
		})
	}
	return trainPlaces
}
