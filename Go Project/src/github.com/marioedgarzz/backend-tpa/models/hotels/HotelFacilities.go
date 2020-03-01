package hotels

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type HotelFacilities struct {
	HotelFacilityId int `gorm:"primary_key;auto_increment"`
	HotelFacilityName string
	HotelFacilityPicture string
}

func InitHotelFacilities(db *gorm.DB) {
	db.AutoMigrate(&HotelFacilities{})
}

func GetAllFacilities() (interface{}, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var hotelFacilities []HotelFacilities

	db.Find(&hotelFacilities)

	return hotelFacilities, nil
}