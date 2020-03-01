package hotels

import "github.com/graphql-go/graphql"

var hotels *graphql.Object

func GetHotelsType() *graphql.Object {
	if hotels == nil {
		hotels = graphql.NewObject(graphql.ObjectConfig{
			Name:        "Hotels",
			Fields:      graphql.Fields{
				"HotelId": &graphql.Field{
					Type: graphql.Int,
				},
				"HotelName" : &graphql.Field{
					Type: graphql.String,
				},
				"HotelPicture" : &graphql.Field{
					Type: graphql.String,
				},
				"HotelCategory" : &graphql.Field{
					Type: GetHotelCategoriesType(),
				},
				"HotelRating" : &graphql.Field{
					Type: graphql.Float,
				},
				"HotelPrice" : &graphql.Field{
					Type: graphql.Int,
				},
				"HotelDiscountPrice" : &graphql.Field{
					Type: graphql.Int,
				},
				"HotelPriceBasedOn" : &graphql.Field{
					Type: graphql.String,
				},
				"HotelLeft" : &graphql.Field{
					Type: graphql.Int,
				},
				"HotelArea" : &graphql.Field{
					Type: GetHotelAreasType(),
				},
				"HotelLocationLatitude" : &graphql.Field{
					Type: graphql.Int,
				},
				"HotelLocationLongitude" : &graphql.Field{
					Type: graphql.Int,
				},
				"HotelInformation" : &graphql.Field{
					Type: graphql.String,
				},
				"HotelAddress" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Hotels",
		})
	}
	return hotels
}
