package car_rental

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm"
)

type CarVendors struct {
	CarVendorId int `gorm:"primary_key;auto_increment"`
	CarVendorName string
	CarVendorPicture string
}

func InitCarVendor(db *gorm.DB) {

	db.AutoMigrate(&CarVendors{})

}
