package hotels

import (
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type HotelAreas struct {
	HotelAreaId int `gorm:"primary_key;auto_increment"`
	HotelPlace HotelPlaces `gorm:"foreign_key:HotelPlaceId"`
	HotelPlaceId int
	HotelAreaName string
}

func InitHotelArea(db *gorm.DB) {
	db.AutoMigrate(&HotelAreas{}).AddForeignKey("hotel_place_id","hotel_places(hotel_place_id)","CASCADE","CASCADE")
}

func GetAllAreaBasedOnPlace(PlaceName string) (interface{}, error) {
	db, err := database.Connect()

	if err != nil {
		return nil ,err
	}

	defer db.Close()

	var hotelAreas []HotelAreas

	db.Joins("JOIN hotel_places hPlace on hPlace.hotel_place_id = hotel_areas.hotel_place_id").
		Where("hotel_place_name = ?",PlaceName).Find(&hotelAreas)

	for i, _ := range hotelAreas {
		db.Model(&hotelAreas[i]).Related(&hotelAreas[i].HotelPlace,"hotel_place_id")
	}

	return hotelAreas, nil
}