package trains

import "github.com/graphql-go/graphql"

var trainClass *graphql.Object

func GetTrainClasses() *graphql.Object {
	if trainClass == nil {
		trainClass = graphql.NewObject(graphql.ObjectConfig{
			Name:        "TrainClass",
			Fields:      graphql.Fields{
				"TrainClassId" : &graphql.Field{
					Type:  graphql.Int,
				},
				"TrainClassName" : &graphql.Field{
					Type: graphql.String,
				},
				"TrainSubclassName" : &graphql.Field{
					Type: graphql.String,
				},
				"TrainClassAdultPrice" : &graphql.Field{
					Type: graphql.Int,
				},
				"TrainClassInfantPrice" : &graphql.Field{
					Type: graphql.Int,
				},
			},
			Description: "Get Train Classes",
		})
	}
	return trainClass
}