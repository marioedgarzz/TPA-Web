package hotelResolvers

import (
	"github.com/graphql-go/graphql"
	hotels2 "github.com/marioedgarzz/backend-tpa/models/hotels"
)

func GetAllHotels(p graphql.ResolveParams) (interface{}, error) {

	hotels, err := hotels2.GetAllHotels()

	return hotels, err
}

func GetAllHotelsByPlaceName(p graphql.ResolveParams) (interface{}, error) {

	PlaceName := p.Args["PlaceName"].(string)

	hotels, err := hotels2.GetAllHotelsByPlace(PlaceName)

	return hotels, err
}

func GetAllAreaBasedOnPlaceName(p graphql.ResolveParams) (interface{}, error) {

	PlaceName := p.Args["PlaceName"].(string)

	hotels, err := hotels2.GetAllAreaBasedOnPlace(PlaceName)

	return hotels, err
}

func GetAllFacilities(p graphql.ResolveParams) (interface{}, error) {

	hotels, err := hotels2.GetAllFacilities()

	return hotels, err
}

func GetHotelByLocation(p graphql.ResolveParams) (i interface{}, e error) {
	location := p.Args["HotelPlace"].(string)

	hotels, err := hotels2.GetAllHotelNamesBasedOnLocation(location)

	return hotels, err
}

func GetAllHotelCategories(p graphql.ResolveParams) (interface{}, error) {

	hotels, err := hotels2.GetAllHotelCategories()

	return hotels, err
}

func GetAllArea(p graphql.ResolveParams) (interface{}, error) {
	hotels, err := hotels2.GetAllArea()

	return hotels, err
}