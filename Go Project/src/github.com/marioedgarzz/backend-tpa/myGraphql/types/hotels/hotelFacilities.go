package hotels

import "github.com/graphql-go/graphql"

var hotelFacilities *graphql.Object

func GetHotelFacilities() *graphql.Object {
	if hotelFacilities == nil {
		hotelFacilities = graphql.NewObject(graphql.ObjectConfig{
			Name:        "HotelFacilities",
			Fields:      graphql.Fields{
				"HotelFacilityId": &graphql.Field{
					Type: graphql.Int,
				},
				"HotelFacilityName" : &graphql.Field{
					Type: graphql.String,
				},
				"HotelFacilityPicture" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Hotel Places",
		})
	}
	return hotelFacilities
}
