package transactions

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/car_rentals"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/users"
)

var carTransactionsType *graphql.Object

func GetCarTransactionType() *graphql.Object {
	if carTransactionsType == nil {
		carTransactionsType = graphql.NewObject(graphql.ObjectConfig{
			Name:        "CarTransactions",
			Fields:      graphql.Fields{
				"CarTransactionId" : &graphql.Field{
					Type: graphql.Int,
				},
				"CarFromVendor" : &graphql.Field{
					Type: car_rentals.GetCarFromVendorsType(),
				},
				"User" : &graphql.Field{
					Type: users.GetTypes(),
				},
				"CarTransactionDate" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Car Transactions Type",
		})
	}
	return carTransactionsType
}
