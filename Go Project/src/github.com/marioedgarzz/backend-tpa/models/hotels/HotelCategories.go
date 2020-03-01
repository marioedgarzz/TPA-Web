package hotels

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm"
)

type HotelCategories struct {
	HotelCategoryId int `gorm:"primary_key;auto_increment"`
	HotelCategoryName string
}

func InitHotelCategories (db *gorm.DB) {
	db.AutoMigrate(&HotelCategories{})
}
