package transactionResolvers

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/models/train"
	"github.com/marioedgarzz/backend-tpa/models/transactions"
)

func CreateNewTrainTransactions(p graphql.ResolveParams) (i interface{}, e error) {

	TrainScheduleId := p.Args["TrainScheduleId"].(int)
	UserId := p.Args["UserId"].(int)
	TrainTransactionDate := p.Args["TrainTransactionDate"].(string)

	transaction, err := transactions.CreateNewTrainTransaction(TrainScheduleId,UserId,TrainTransactionDate)

	return transaction, err
}

func CreateNewCarTransactions(p graphql.ResolveParams) (i interface{}, e error) {

	CarFromVendorId := p.Args["CarFromVendorId"].(int)
	UserId := p.Args["UserId"].(int)
	CarTransactionDate := p.Args["CarTransactionDate"].(string)

	transaction, err := transactions.CreateNewCarTransaction(CarFromVendorId,UserId,CarTransactionDate)

	return transaction, err
}

func InsertNewTrainSchedule(p graphql.ResolveParams) (i interface{}, e error) {
	TrainName := p.Args["TrainName"].(string)
	TrainTimeFrom := p.Args["TrainTimeFrom"].(string)
	TrainTimeTo := p.Args["TrainTimeTo"].(string)
	TrainClassName := p.Args["TrainClassName"].(string)

	transaction, err := train.InsertNewTrainSchedule(TrainName, TrainTimeFrom, TrainTimeTo, TrainClassName)

	return transaction, err
}
