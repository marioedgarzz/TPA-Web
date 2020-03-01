package car_rental

import (
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type Temp struct {
	gorm.Model
}
type CarBrands struct {
	CarBrandId int `gorm:"primary_key;auto_increment"`
	CarBrandName string
}

func InitCarBrands(db *gorm.DB) {
	db.AutoMigrate(&CarBrands{})
}

func GetAllCarBrands() ([]CarBrands, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var carBrands []CarBrands

	db.Find(&carBrands)

	return carBrands, nil

}
