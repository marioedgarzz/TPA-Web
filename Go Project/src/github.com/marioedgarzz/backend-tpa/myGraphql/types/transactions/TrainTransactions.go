package transactions

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/trains"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/users"
)

var trainTransactionsType *graphql.Object

func GetTrainTransactionType() *graphql.Object {
	if trainTransactionsType == nil {
		trainTransactionsType = graphql.NewObject(graphql.ObjectConfig{
			Name:        "TrainTransactions",
			Fields:      graphql.Fields{
				"TrainTransactionId" : &graphql.Field{
					Type: graphql.Int,
				},
				"TrainSchedule" : &graphql.Field{
					Type: trains.GetTrainSchedules(),
				},
				"User" : &graphql.Field{
					Type: users.GetTypes(),
				},
				"TrainTransactionDate" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Train Transactions Type",
		})
	}
	return trainTransactionsType
}