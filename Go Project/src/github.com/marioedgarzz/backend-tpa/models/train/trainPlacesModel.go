package train

import (
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type TrainPlaces struct {
	TrainPlaceId   int `gorm:"primary_key;auto_increment"`
	TrainPlaceName string
}

func InitializePlaces(db *gorm.DB) {

	db.AutoMigrate(&TrainPlaces{})
}

func GetAllTrainPlaces() (interface{}, error){
	db, err := database.Connect()
	if err != nil {
		panic ("Connect db fail")
	}

	defer db.Close()

	var trainPlace []TrainPlaces

	db.Find(&trainPlace)

	return trainPlace, err
}
