package mutations

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/myGraphql/mutations/mutationResolvers/adminResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/mutations/mutationResolvers/transactionResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/mutations/mutationResolvers/userResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/hotels"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/trains"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/transactions"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/users"
)

func GetRoot() *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name:        "RootMutations",
		Fields:      graphql.Fields{
			"createUser": {
				Type: users.GetTypes(),
				Args:              graphql.FieldConfigArgument{
					"Username" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"UserEmail" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"UserPassword" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"UserPhoneNumber" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve:     userResolvers.CreateNewUser,
				Description: "Create New User",
			},
			"setUserCurrency" : {
				Type:              users.GetTypes(),
				Args:              graphql.FieldConfigArgument{
					"UserId" : &graphql.ArgumentConfig{
						Type: graphql.Int,
					},
					"UserCurrency" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve:           userResolvers.SetUserCurrency,
				Description:       "Set User Currency",
			},
			"setUserLanguage" : {
				Type:              users.GetTypes(),
				Args:              graphql.FieldConfigArgument{
					"UserId" : &graphql.ArgumentConfig{
						Type: graphql.Int,
					},
					"UserLanguage" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve:           userResolvers.SetUserLanguage,
				Description:       "Set User Currency",
			},
			"updateAccountData" : {
				Type : users.GetTypes(),
				Args: graphql.FieldConfigArgument{
					"UserId" : &graphql.ArgumentConfig{
						Type: graphql.Int,
					},
					"UserTitle" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"Username" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"UserAddress" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"UserPostalCode" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"UserCity" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: userResolvers.UpdateAccountData,
				Description: "Update User Account",
			},
			"createNewTrainTransactions" : {
				Type:              transactions.GetTrainTransactionType(),
				Args:              graphql.FieldConfigArgument{
					"TrainScheduleId" : &graphql.ArgumentConfig{
						Type:  graphql.Int,
					},
					"UserId" : &graphql.ArgumentConfig{
						Type:  graphql.Int,
					},
					"TrainTransactionDate" : &graphql.ArgumentConfig{
						Type:  graphql.String,
					},
				},
				Resolve:           transactionResolvers.CreateNewTrainTransactions,
				Description:       "Create New Train Transactions",
			},
			"createNewCarTransactions" : {
				Type:              transactions.GetCarTransactionType(),
				Args:              graphql.FieldConfigArgument{
					"CarFromVendorId" : &graphql.ArgumentConfig{
						Type:  graphql.Int,
					},
					"UserId" : &graphql.ArgumentConfig{
						Type:  graphql.Int,
					},
					"CarTransactionDate" : &graphql.ArgumentConfig{
						Type:  graphql.String,
					},
				},
				Resolve:           transactionResolvers.CreateNewCarTransactions,
				Description:       "Create New Car Transactions",
			},
			"insertNewTrainSchedule": {
				Type:              trains.GetTrainSchedules(),
				Args:              graphql.FieldConfigArgument{
					"TrainName" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"TrainTimeFrom" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"TrainTimeTo" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"TrainClassName" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           transactionResolvers.InsertNewTrainSchedule,
				Description:       "Insert New Train Transaction",
			},
			"updateTrainSchedule" : {
				Type:              trains.GetTrainSchedules(),
				Args:              graphql.FieldConfigArgument{
					"TrainScheduleId" : &graphql.ArgumentConfig{
						Type: graphql.Int,
					},
					"TrainName" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"TrainTimeFrom" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"TrainTimeTo" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"TrainClassName" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve:           adminResolvers.UpdateTrainSchedule,
				Description:       "Update Train Schedule",
			},
			"deleteTrainSchedule" : {
				Type:              trains.GetTrainSchedules(),
				Args:              graphql.FieldConfigArgument{
					"TrainScheduleId" : &graphql.ArgumentConfig{
						Type: graphql.Int,
					},
				},
				Resolve:           adminResolvers.DeleteTrainSchedule,
				Description:       "Delete Train Schedule",
			},
			"insertNewHotel" : {
				Type:              hotels.GetHotelsType(),
				Args:              graphql.FieldConfigArgument{
					"HotelName" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"HotelPicture" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"HotelLocation" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"HotelRating" : &graphql.ArgumentConfig{
						Type:         graphql.Float,
					},
					"HotelAddress" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"HotelFacilitiesId" : &graphql.ArgumentConfig{
						Type:         graphql.NewList(graphql.Int),
					},
					"HotelCategoryName" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"HotelInformation" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           adminResolvers.InsertNewHotel,
				Description:       "Insert New Hotel",
			},
			"updateHotel" : {
				Type:              hotels.GetHotelsType(),
				Args:              graphql.FieldConfigArgument{
					"HotelId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"HotelName" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"HotelPicture" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"HotelLocation" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"HotelRating" : &graphql.ArgumentConfig{
						Type:         graphql.Float,
					},
					"HotelAddress" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"HotelFacilitiesId" : &graphql.ArgumentConfig{
						Type:         graphql.NewList(graphql.Int),
					},
					"HotelCategoryName" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"HotelInformation" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           adminResolvers.UpdateHotel,
				Description:       "Update Hotel",
			},
			"deleteHotel" : {
				Type:              hotels.GetHotelsType(),
				Args:              graphql.FieldConfigArgument{
					"HotelId" : &graphql.ArgumentConfig{
						Type: graphql.Int,
					},
				},
				Resolve:           adminResolvers.DeleteHotel,
				Description:       "Delete Hotel",
			},
		},

		Description: "My Mutations",
	})
}
