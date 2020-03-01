package adminResolvers

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/models/train"
)

func UpdateTrainSchedule(p graphql.ResolveParams) (i interface{}, e error) {
	TrainScheduleId := p.Args["TrainScheduleId"].(int)
	TrainName := p.Args["TrainName"].(string)
	TrainTimeFrom := p.Args["TrainTimeFrom"].(string)
	TrainTimeTo := p.Args["TrainTimeTo"].(string)
	TrainClassName := p.Args["TrainClassName"].(string)

	transaction, err := train.UpdateTrainSchedule(TrainScheduleId,TrainName,TrainTimeFrom, TrainTimeTo, TrainClassName)

	return transaction ,err
}

func DeleteTrainSchedule(p graphql.ResolveParams) (i interface{}, e error) {
	TrainScheduleId := p.Args["TrainScheduleId"].(int)

	transaction, err := train.DeleteTrainSchedule(TrainScheduleId)

	return transaction ,err
}
