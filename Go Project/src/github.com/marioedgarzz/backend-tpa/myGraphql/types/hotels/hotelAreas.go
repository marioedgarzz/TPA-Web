package hotels

import "github.com/graphql-go/graphql"

var hotelAreas *graphql.Object

func GetHotelAreasType() *graphql.Object {
	if hotelAreas == nil {
		hotelAreas = graphql.NewObject(graphql.ObjectConfig{
			Name:        "HotelAreas",
			Fields:      graphql.Fields{
				"HotelAreaId": &graphql.Field{
					Type: graphql.Int,
				},
				"HotelPlace" : &graphql.Field{
					Type: GetHotelPlacesType(),
				},
				"HotelAreaName" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Hotel Area",
		})
	}
	return hotelAreas
}
