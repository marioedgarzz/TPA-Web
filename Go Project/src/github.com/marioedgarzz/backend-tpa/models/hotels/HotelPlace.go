package hotels

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm"
)

type HotelPlaces struct {
	HotelPlaceId int `gorm:"primary_key;auto_increment"`
	HotelPlaceName string
}

func InitHotelPlace(db *gorm.DB) {
	db.AutoMigrate(&HotelPlaces{})
}
