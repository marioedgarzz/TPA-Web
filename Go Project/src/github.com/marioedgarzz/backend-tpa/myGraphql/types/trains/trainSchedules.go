package trains

import "github.com/graphql-go/graphql"

var trainSchedules *graphql.Object

func GetTrainSchedules() *graphql.Object {
	if trainSchedules == nil {
		trainSchedules = graphql.NewObject(graphql.ObjectConfig{
			Name:        "TrainSchedule",
			Fields:      graphql.Fields{
				"TrainScheduleId" : &graphql.Field{
					Type:	graphql.Int,
				},
				"Train" : &graphql.Field{
					Type: GetTrains(),
				},
				"TrainClass" : &graphql.Field{
					Type: GetTrainClasses(),
				},
				"TrainPlaceFrom" : &graphql.Field{
					Type: GetTrainPlaces(),
				},
				"TrainPlaceTo" : &graphql.Field{
					Type: GetTrainPlaces(),
				},
				"TrainDate" : &graphql.Field{
					Type: graphql.String,
				},
				"TrainTimeFrom" : &graphql.Field{
					Type: graphql.String,
				},
				"TrainTimeTo" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Train Schedule",
		})
	}
	return trainSchedules
}
