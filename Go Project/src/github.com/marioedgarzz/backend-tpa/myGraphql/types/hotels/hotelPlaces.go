package hotels

import "github.com/graphql-go/graphql"

var hotelPlaces *graphql.Object

func GetHotelPlacesType() *graphql.Object {
	if hotelPlaces == nil {
		hotelPlaces = graphql.NewObject(graphql.ObjectConfig{
			Name:        "HotelPlaces",
			Fields:      graphql.Fields{
				"HotelPlaceId": &graphql.Field{
					Type: graphql.Int,
				},
				"HotelPlaceName" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Hotel Places",
		})
	}
	return hotelPlaces
}
