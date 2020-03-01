package hotels

import "github.com/graphql-go/graphql"

var hotelCategories *graphql.Object

func GetHotelCategoriesType() *graphql.Object {
	if hotelCategories == nil {
		hotelCategories = graphql.NewObject(graphql.ObjectConfig{
			Name:        "HotelCategories",
			Fields:      graphql.Fields{
				"HotelCategoryId": &graphql.Field{
					Type: graphql.Int,
				},
				"HotelCategoryName" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Hotel Categories",
		})
	}
	return hotelCategories
}
