package car_rental

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type CarModels struct {
	CarModelId int `gorm:"primary_key;auto_increment"`
	CarModelName string
}

func InitCarModels(db *gorm.DB) {

	db.AutoMigrate(&CarModels{})

}

func GetAllCarModels() ([]CarModels, error) {

	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var carModels []CarModels

	db.Find(&carModels)

	return carModels, nil
}