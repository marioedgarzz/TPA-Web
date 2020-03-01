package trainResolvers

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/models/train"
)

func GetAllTrainSchedules(p graphql.ResolveParams) (i interface{}, e error) {
	trainPlaceFrom := p.Args["trainPlaceFrom"].(string)
	trainPlaceTo := p.Args["trainPlaceTo"].(string)


	trains, err := train.GetAllTrainSchedule(trainPlaceFrom, trainPlaceTo)

	return trains, err
}

func GetAllClasses(p graphql.ResolveParams) (i interface{}, e error) {
	trains, err := train.GetAllClasses()

	return trains, err
}

func GetAllTrainNames(p graphql.ResolveParams) (i interface{}, e error) {
	trains, err := train.GetAllTrainNames()

	return trains, err
}

func GetAllTrainPlaces(p graphql.ResolveParams) (i interface{}, e error) {
	trains, err := train.GetAllTrainPlaces()

	return trains, err
}

func GetEveryTrainSchedules(p graphql.ResolveParams) (i interface{}, e error) {
	trains, err := train.GetEveryTrainSchedules()

	return trains, err
}

