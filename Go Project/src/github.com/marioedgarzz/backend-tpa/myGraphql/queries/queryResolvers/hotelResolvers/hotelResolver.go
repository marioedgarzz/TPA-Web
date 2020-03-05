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

func Filters(p graphql.ResolveParams) (interface{}, error) {
	//minPrice int, maxPrice int, hotelName int, hotelRating []bool,
	//	hotelArea string, hotelFacilities []int
	MinPrice := p.Args["MinPrice"].(int)
	MaxPrice := p.Args["MaxPrice"].(int)
	HotelName := p.Args["HotelName"].(string)
	HotelRating := p.Args["HotelRating"].([]interface{})
	HotelArea := p.Args["HotelArea"].(string)
	HotelFacilities := p.Args["HotelFacilities"].([]interface{})
	HotelLocation := p.Args["HotelLocation"].(string)
	var newHotelRating [3]bool

	for i,_ := range HotelRating {
		newHotelRating[i] = HotelRating[i].(bool)
	}

	var newHotelFacilitiesId[100] int
	var length = len(HotelFacilities)
	for i,_ := range HotelFacilities {
		newHotelFacilitiesId[i] = HotelFacilities[i].(int)
	}

	var newHotel = newHotelFacilitiesId[:length]

	return hotels2.Filters(HotelLocation,MinPrice,MaxPrice,HotelName,newHotelRating,HotelArea,newHotel)


}