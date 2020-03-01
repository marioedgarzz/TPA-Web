package car_rental

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type CarFromVendors struct {
	CarFromVendorId int `gorm:"primary_key;auto_increment"`
	CarVendor CarVendors `gorm:"foreign_key:CarVendorId"`
	CarVendorId int
	CarRentalPlace CarRentalPlaces `gorm:"foreign_key:CarRentalPlaceId"`
	CarRentalPlaceId int
	CarPrice int
	Car Cars `gorm:"foreign_key:CarId"`
	CarId int
}

func InitCarFromVendors(db *gorm.DB) {

	db.AutoMigrate(&CarFromVendors{}).
		AddForeignKey("car_vendor_id","car_vendors(car_vendor_id)","CASCADE","CASCADE").
		AddForeignKey("car_id","cars(car_id)","CASCADE","CASCADE").
		AddForeignKey("car_rental_place_id", "car_rental_places(car_rental_place_id)","CASCADE","CASCADE")
		//AddForeignKey("car_model_id","car_models(car_model_id)","CASCADE","CASCADE").
		//AddForeignKey("car_brand_id","car_brands(car_brand_id)","CASCADE","CASCADE")

}

func GetAllCars() (interface{}, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var cars []CarFromVendors

	db.Find(&cars)

	for i, _:= range cars {
		db.Model(&cars[i]).Related(&cars[i].CarVendor,"car_vendor_id").
			Related(&cars[i].Car,"car_id")
		db.Model(&cars[i].Car).Related(&cars[i].Car.CarModel,"car_model_id").
			Related(&cars[i].Car.CarBrand,"car_brand_id")
	}

	return cars, nil
}

func GetCarByFromVendorId(id int) (interface{}, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var cars []CarFromVendors

	db.Where("car_id = ?",id).Find(&cars)

	for i, _:= range cars {
		db.Model(&cars[i]).Related(&cars[i].CarVendor,"car_vendor_id").
			Related(&cars[i].Car,"car_id").
			Related(&cars[i].CarRentalPlace,"car_rental_place_id")
		db.Model(&cars[i].Car).Related(&cars[i].Car.CarModel,"car_model_id").
			Related(&cars[i].Car.CarBrand,"car_brand_id")

	}

	return cars, nil
}

func GetCarByRentalPlace(CarRentalPlace string) (interface{}, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var cars []CarFromVendors

	db.Joins("JOIN car_rental_places ON car_rental_places.car_rental_place_id = car_from_vendors.car_rental_place_id").
		Where("car_rental_place_name = ?",CarRentalPlace).Find(&cars)

	for i, _  := range cars {
		db.Model(&cars[i]).Related(&cars[i].CarRentalPlace,"car_rental_place_id").
			Related(&cars[i].CarVendor,"car_vendor_id").
			Related(&cars[i].Car,"car_id")
		db.Model(&cars[i].Car).Related(&cars[i].Car.CarModel, "car_model_id").
			Related(&cars[i].Car.CarBrand,"car_brand_id")
	}

	return cars, nil
}
