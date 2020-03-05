package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/myGraphql/queries/queryResolvers/blogResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/queries/queryResolvers/carResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/queries/queryResolvers/chatResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/queries/queryResolvers/emailResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/queries/queryResolvers/eventResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/queries/queryResolvers/hotelResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/queries/queryResolvers/promoResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/queries/queryResolvers/trainResolvers"
	"github.com/marioedgarzz/backend-tpa/myGraphql/queries/queryResolvers/userResolvers"
	blogs2 "github.com/marioedgarzz/backend-tpa/myGraphql/types/blogs"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/car_rentals"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/chats"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/events"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/hotels"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/promos"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/trains"
	"github.com/marioedgarzz/backend-tpa/myGraphql/types/users"
)

func GetRoot() *graphql.Object{
	return graphql.NewObject(graphql.ObjectConfig{
		Name:        "RootQuery",
		Fields:      graphql.Fields{
			"getAllUsers" : {
				Type:        graphql.NewList(users.GetTypes()),
				Resolve:     userResolvers.GetAllUsers,
				Description: "Get All Users",
			},
			"searchByUserEmailOrPhone" : {
				Type:              graphql.NewList(users.GetTypes()),
				Args:              graphql.FieldConfigArgument{
					"emailOrPhone" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:     userResolvers.GetUserByPhoneOrEmail,
				Description: "Search By Email Or Phone",
			},
			"getUserById" : {
				Type:              graphql.NewList(users.GetTypes()),
				Args:              graphql.FieldConfigArgument{
					"id" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
				},
				Resolve:           userResolvers.GetUserById,
				Description:       "Search User By Id",
			},
			"getAdminByUsernameAndPassword" : {
				Type:              graphql.NewList(users.GetAdminTypes()),
				Args:              graphql.FieldConfigArgument{
					"AdminUsername" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"AdminPassword" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           userResolvers.GetAdminByUsernameAndPassword,
				Description:       "Get Admin By Username and Password",
			},
			"getAdminById" : {
				Type:              graphql.NewList(users.GetAdminTypes()),
				Args:              graphql.FieldConfigArgument{
					"AdminId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
				},
				Resolve:           userResolvers.GetAdminById,
				Description:       "Get Admin By Id",
			},
			"getAllTrainSchedules" : {
				Type:              graphql.NewList(trains.GetTrainSchedules()),
				Args : 			   graphql.FieldConfigArgument{
					"trainPlaceFrom" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"trainPlaceTo" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           trainResolvers.GetAllTrainSchedules,
				Description:       "Get All Train Schedules from and to",
			},
			"getEveryTrainSchedules" : {
				Type:              graphql.NewList(trains.GetTrainSchedules()),
				Resolve:           trainResolvers.GetEveryTrainSchedules,
				Description:       "Get EVERY Train Schedule",
			},
			"getAllClasses" : {
				Type:              graphql.NewList(trains.GetTrainClasses()),
				Resolve:           trainResolvers.GetAllClasses,
				Description:       "Get Train Classes",
			},
			"getAllTrainNames" : {
				Type:              graphql.NewList(trains.GetTrains()),
				Resolve:           trainResolvers.GetAllTrainNames,
				Description:       "Get All Train Names",
			},
			"getAllTrainPlaces" : {
				Type:              graphql.NewList(trains.GetTrainPlaces()),
				Resolve:           trainResolvers.GetAllTrainPlaces,
				Description:       "Get All Train Places",
			},
			"getAllCars" : {
				Type: 		graphql.NewList(car_rentals.GetCarFromVendorsType()),
				Resolve:	carResolvers.GetAllCars,
				Description: "Get All Cars",
			},
			"getCarByRentalPlace" : {
				Type:              graphql.NewList(car_rentals.GetCarFromVendorsType()),
				Args : graphql.FieldConfigArgument{
					"CarRentalPlace" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           carResolvers.GetCarByRentalPlace,
				Description:       "Get Car By Rental Place",
			},
			"getCarByFromVendorId" : {
				Type: 		graphql.NewList(car_rentals.GetCarFromVendorsType()),
				Args: graphql.FieldConfigArgument{
					"CarFromVendorId" : &graphql.ArgumentConfig{
						Type: graphql.Int,
					},
				},
				Resolve:	carResolvers.GetCarFromVendorId,
				Description: "Get Car by Vendor Id",
			},
			"getAllCarBrands" : {
				Type:              graphql.NewList(car_rentals.GetCarBrandsType()),
				Resolve:           carResolvers.GetAllCarBrands,
				Description:       "Get All Car Brands",
			},
			"getAllCarModels" : {
				Type:        graphql.NewList(car_rentals.GetCarModelsType()),
				Resolve:     carResolvers.GetAllCarModels,
				Description: "Get All Car Models",
			},
			"getAllHotels" : {
				Type:        graphql.NewList(hotels.GetHotelFacilityListsType()),
				Resolve:     hotelResolvers.GetAllHotels,
				Description: "Get All Hotel",
			},
			"getAllHotelsByPlaceName" : {
				Type:        graphql.NewList(hotels.GetHotelFacilityListsType()),
				Args: graphql.FieldConfigArgument{
					"PlaceName" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:     hotelResolvers.GetAllHotelsByPlaceName,
				Description: "Get All Hotel By Place Name",
			},
			"getAllAreasByPlaceName" : {
				Type:        graphql.NewList(hotels.GetHotelAreasType()),
				Args: graphql.FieldConfigArgument{
					"PlaceName" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:     hotelResolvers.GetAllAreaBasedOnPlaceName,
				Description: "Get All Area By Place Name",
			},
			"getAllFacilities" : {
				Type:        graphql.NewList(hotels.GetHotelFacilities()),
				Resolve:     hotelResolvers.GetAllFacilities,
				Description: "Get All Hotel Facilities",
			},
			"getHotelByLocation" : {
				Type:              graphql.NewList(hotels.GetHotelsType()),
				Args:              graphql.FieldConfigArgument{
					"HotelPlace" : &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve:           hotelResolvers.GetHotelByLocation,
				Description:       "Get Hotel By Location",
			},
			"getAllHotelCategories" : {
				Type:              graphql.NewList(hotels.GetHotelCategoriesType()),
				Resolve:           hotelResolvers.GetAllHotelCategories,
				Description:       "Get All Hotel Categories",
			},
			"getAllHotelAreas" : {
				Type:              graphql.NewList(hotels.GetHotelAreasType()),
				Resolve:           hotelResolvers.GetAllArea,
				Description:       "Get All Hotel Area",
			},
			"getAllPromos" : {
				Type:              graphql.NewList(promos.GetTypes()),
				Resolve:           promoResolvers.GetAllPromos,
				Description:       "Get All Promos",
			},
			"getAllEvents" : {
				Type:              graphql.NewList(events.GetTypes()),
				Resolve:           eventResolvers.GetAllEvents,
				Description:       "Get All Events",
			},
			"getAllBlogs" : {
				Type:              graphql.NewList(blogs2.GetBlogsType()),
				Resolve:           blogResolvers.GetAllBlogs,
				Description:       "Get All Blogs",
			},
			"getBlogById" : {
				Type:              graphql.NewList(blogs2.GetBlogsType()),
				Args:			   graphql.FieldConfigArgument{
					"BlogId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
				},
				Resolve:           blogResolvers.GetBlogById,
				Description:       "Get Blog By Id",
			},
			"getAllBlogCategories" : {
				Type:              graphql.NewList(blogs2.GetBlogCategoryType()),
				Resolve:           blogResolvers.GetAllBlogCategories,
				Description:       "Get All Blog Categories",
			},
			"getAllChatRoomsByAdminId" : {
				Type:              graphql.NewList(chats.GetTypes()),
				Args:			   graphql.FieldConfigArgument{
					"AdminId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
				},
				Resolve:           chatResolvers.GetAllChatRoomsByAdminId,
				Description:       "Get All Admin Chat Rooms",
			},
			"getAllChatRoomsByUserId" : {
				Type:              graphql.NewList(chats.GetTypes()),
				Args:			   graphql.FieldConfigArgument{
					"UserId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
				},
				Resolve:           chatResolvers.GetAllChatRoomsByUserId,
				Description:       "Get All User Chat Rooms",
			},
			"getAllChatsByRoomId" : {
				Type:              graphql.NewList(chats.GetChatDetailTypes()),
				Args:			   graphql.FieldConfigArgument{
					"RoomId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
				},
				Resolve:           chatResolvers.GetAllChatsByRoomId,
				Description:       "Get All Chat Of Room Id",
			},
			"sendEmail" : {
				Type:              graphql.String,
				Resolve:           emailResolvers.SendEmail,
				Description:       "Send Email",
			},
			"getUserByFacebookKey" : {
				Type:              graphql.NewList(users.GetTypes()),
				Args:              graphql.FieldConfigArgument{
					"FacebookKey" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           userResolvers.GetUserByFacebookKey,
				Description:       "Insert Facebook Key",
			},
			"getUserByGoogleKey" : {
				Type:              graphql.NewList(users.GetTypes()),
				Args:              graphql.FieldConfigArgument{
					"GoogleKey" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
				},
				Resolve:           userResolvers.GetUserByGoogleKey,
				Description:       "Insert Google Key",
			},
			"GetLastChatDetailByRoomId" : {
				Type:              graphql.NewList(chats.GetChatDetailTypes()),
				Args: graphql.FieldConfigArgument{
					"RoomId" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
				},
				Resolve:           chatResolvers.GetLastChatDetailByRoomId,
				Description:       "Get Last Chat",
			},
			"FilterHotels" : {
				Type:              graphql.NewList(hotels.GetHotelFacilityListsType()),
				Args:              graphql.FieldConfigArgument{
					"HotelLocation" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"MinPrice" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"MaxPrice" : &graphql.ArgumentConfig{
						Type:         graphql.Int,
					},
					"HotelName" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"HotelRating" : &graphql.ArgumentConfig{
						Type:         graphql.NewList(graphql.Boolean),
					},
					"HotelArea" : &graphql.ArgumentConfig{
						Type:         graphql.String,
					},
					"HotelFacilities" : &graphql.ArgumentConfig{
						Type:         graphql.NewList(graphql.Int),
					},
				},
				Resolve:           hotelResolvers.Filters,
				Description:       "Get Hotels Filters",
			},
		},
		Description: "My Queries",
	})
}
