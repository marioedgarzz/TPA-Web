package mutations

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/myGraphql/mutations/mutationResolvers/adminResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/mutations/mutationResolvers/chatResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/mutations/mutationResolvers/transactionResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/mutations/mutationResolvers/userResolvers"
	blogs2 "github.com/marioedgarzz/backend-tpa/myGraphql/types/blogs"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/chats"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/events"
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
					"GoogleId" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
					"FacebookId" : &graphql.ArgumentConfig{
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
			"insertNewEvent" : {
				Type:              events.GetTypes(),
				Args:              graphql.FieldConfigArgument{
					"EventName" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventLocation" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventType" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventDateFrom" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventPicture" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventDescription" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventTermsAndCondition" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           adminResolvers.InsertNewEvent,
				Description:       "Insert New Event",
			},
			"updateEvent" : {
				Type:              events.GetTypes(),
				Args:              graphql.FieldConfigArgument{
					"EventId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"EventName" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventLocation" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventType" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventCategory" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventDateFrom" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventPicture" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventDescription" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"EventTermsAndCondition" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           adminResolvers.UpdateEvent,
				Description:       "Update Event",
			},
			"deleteEvent" : {
				Type:              events.GetTypes(),
				Args:              graphql.FieldConfigArgument{
					"EventId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
				},
				Resolve:           adminResolvers.DeleteEvent,
				Description:       "Delete Event",
			},
			"insertNewBlog" : {
				Type:              blogs2.GetBlogsType(),
				Args:              graphql.FieldConfigArgument{
					"BlogTitle" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"BlogThumbnail" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"BlogContent" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"BlogCategory" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           adminResolvers.InsertNewBlog,
				Description:       "Insert New Blog",
			},
			"UpdateBlog" : {
				Type:              blogs2.GetBlogsType(),
				Args:              graphql.FieldConfigArgument{
					"BlogId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"BlogTitle" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"BlogThumbnail" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"BlogContent" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"BlogCategory" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           adminResolvers.UpdateBlog,
				Description:       "Update Blog",
			},
			"deleteBlog" : {
				Type:              blogs2.GetBlogsType(),
				Args:              graphql.FieldConfigArgument{
					"BlogId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
				},
				Resolve:           adminResolvers.DeleteBlog,
				Description:       "Delete Blog",
			},
			"insertNewChatRoom" : {
				Type:              chats.GetTypes(),
				Args:              graphql.FieldConfigArgument{
					"AdminId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"UserId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"ChatLocation" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"ChatPaymentName" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"ChatPaymentPrice" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"ChatPaymentStatus" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},

				},
				Resolve:           chatResolvers.InsertNewRooms,
				Description:       "Insert New Chat Room",
			},
			"UpdateAdminStatus" : {
				Type:              chats.GetTypes(),
				Args:              graphql.FieldConfigArgument{
					"RoomId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"Status" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           chatResolvers.UpdateAdminStatus,
				Description:       "Update Admin Status",
			},
			"UpdateUserStatus" : {
				Type:              chats.GetTypes(),
				Args:              graphql.FieldConfigArgument{
					"RoomId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"Status" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           chatResolvers.UpdateUserStatus,
				Description:       "Update User Status",
			},
			"SendMessage" : {
				Type:              chats.GetChatDetailTypes(),
				Args:              graphql.FieldConfigArgument{
					"RoomId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"SenderRole" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"ReceiverRole" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"ContentMessage" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"ChatDateTime" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           chatResolvers.SendMessage,
				Description:       "Send Chat Message",
			},
			"insertFacebookKey" : {
				Type:              users.GetTypes(),
				Args:              graphql.FieldConfigArgument{
					"UserId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"FacebookKey" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           userResolvers.InsertFacebookKey,
				Description:       "Insert Facebook Key",
			},
			"insertGoogleKey" : {
				Type:              users.GetTypes(),
				Args:              graphql.FieldConfigArgument{
					"UserId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"GoogleKey" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           userResolvers.InsertGoogleKey,
				Description:       "Insert Google Key",
			},
			"subscribeNewsletter" : {
				Type:              users.GetTypes(),
				Args:              graphql.FieldConfigArgument{
					"UserId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
				},
				Resolve:           userResolvers.SubscribeNewsLetter,
				Description:       "Subscribe New Letter",
			},
		},

		Description: "My Mutations",
	})
}
