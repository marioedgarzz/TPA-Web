package hotels

import "github.com/graphql-go/graphql"

var hotelFacilityLists *graphql.Object

func GetHotelFacilityListsType() *graphql.Object {
	if hotelFacilityLists == nil {
		hotelFacilityLists = graphql.NewObject(graphql.ObjectConfig{
			Name:        "HotelFacilityLists",
			Fields:      graphql.Fields{
				"HotelFacility": &graphql.Field{
					Type: GetHotelFacilities(),
				},
				"Hotel" : &graphql.Field{
					Type: GetHotelsType(),
				},
			},
			Description: "Get Hotel Facilities Lists",
		})
	}
	return hotelFacilityLists
}

