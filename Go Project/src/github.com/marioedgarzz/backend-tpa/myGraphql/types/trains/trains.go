package trains

import "github.com/graphql-go/graphql"

var trains *graphql.Object

func GetTrains() *graphql.Object {
	if trains == nil {
		trains = graphql.NewObject(graphql.ObjectConfig{
			Name:        "TrainType",
			Fields:      graphql.Fields{
				"TrainId" : &graphql.Field{
					Type:  graphql.Int,
				},
				"TrainName" : &graphql.Field{
					Type: graphql.String,
				},
				"TrainBasePrice" : &graphql.Field{
					Type:  graphql.Int,
				},
			},
			Description: "Get Train Type",
		})
	}
	return trains
}