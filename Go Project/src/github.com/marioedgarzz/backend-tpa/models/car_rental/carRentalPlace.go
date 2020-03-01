package car_rental

import "github.com/jinzhu/gorm"

type Temp2 struct {
	gorm.Model
}
type CarRentalPlaces struct {
	CarRentalPlaceId int `gorm:"primary_key;auto_increment"`
	CarRentalPlaceName string
}

func InitCarRentalPlace(db *gorm.DB) {
	db.AutoMigrate(&CarRentalPlaces{})
}
