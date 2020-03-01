package carResolvers

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/models/car_rental"
)

func GetAllCars(p graphql.ResolveParams) (interface{}, error) {

	cars, err := car_rental.GetAllCars()

	return cars, err
}

func GetCarFromVendorId(p graphql.ResolveParams) (interface{}, error) {

	CarFromVendorId := p.Args["CarFromVendorId"].(int)

	cars, err := car_rental.GetCarByFromVendorId(CarFromVendorId)

	return cars, err
}

func GetAllCarModels(p graphql.ResolveParams) (i interface{}, e error) {

	cars, err := car_rental.GetAllCarModels()

	return cars, err
}

func GetAllCarBrands(p graphql.ResolveParams) (i interface{}, e error) {

	cars, err := car_rental.GetAllCarBrands()

	return cars, err

}

func GetCarByRentalPlace(p graphql.ResolveParams) (i interface{}, e error) {
	CarRentalPlace := p.Args["CarRentalPlace"].(string)
	cars, err := car_rental.GetCarByRentalPlace(CarRentalPlace)

	return cars, err
}