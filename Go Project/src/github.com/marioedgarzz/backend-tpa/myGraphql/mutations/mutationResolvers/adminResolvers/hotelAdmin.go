package adminResolvers

import (
	"github.com/graphql-go/graphql"
	hotels2 "github.com/marioedgarzz/backend-tpa/models/hotels"
)

func InsertNewHotel(p graphql.ResolveParams) (interface{}, error){

	hotelName := p.Args["HotelName"].(string)
	hotelPicture := p.Args["HotelPicture"].(string)
	hotelLocation := p.Args["HotelLocation"].(string)
	hotelRating := p.Args["HotelRating"].(float64)
	hotelAddress := p.Args["HotelAddress"].(string)
	hotelFacilitiesId := p.Args["HotelFacilitiesId"].([]interface{})

	var newHotelFacilitiesId[100] int
	var length = len(hotelFacilitiesId)
	for i,_ := range hotelFacilitiesId {
		newHotelFacilitiesId[i] = hotelFacilitiesId[i].(int)
	}

	hotelCategoryName := p.Args["HotelCategoryName"].(string)
	hotelInformation := p.Args["HotelInformation"].(string)

	return hotels2.InsertNewHotel(hotelName,hotelPicture,hotelLocation,hotelRating,
		hotelAddress, newHotelFacilitiesId,length,hotelCategoryName,hotelInformation)
}

func UpdateHotel(p graphql.ResolveParams) (interface{}, error){

	hotelId := p.Args["HotelId"].(int)
	hotelName := p.Args["HotelName"].(string)
	hotelPicture := p.Args["HotelPicture"].(string)
	hotelLocation := p.Args["HotelLocation"].(string)
	hotelRating := p.Args["HotelRating"].(float64)
	hotelAddress := p.Args["HotelAddress"].(string)
	hotelFacilitiesId := p.Args["HotelFacilitiesId"].([]interface{})

	var length = len(hotelFacilitiesId)
	var newHotelFacilitiesId[100] int
	for i,_ := range hotelFacilitiesId {
		newHotelFacilitiesId[i] = hotelFacilitiesId[i].(int)
	}

	hotelCategoryName := p.Args["HotelCategoryName"].(string)
	hotelInformation := p.Args["HotelInformation"].(string)

	hotels, err := hotels2.UpdateHotels(hotelId,hotelName,hotelPicture,hotelLocation,hotelRating,
		hotelAddress,newHotelFacilitiesId, length,hotelCategoryName,hotelInformation)

	return hotels, err
}

func DeleteHotel(p graphql.ResolveParams) (interface{}, error) {
	hotelId := p.Args["HotelId"].(int)

	hotels, err := hotels2.DeleteHotels(hotelId)

	return hotels, err
}
