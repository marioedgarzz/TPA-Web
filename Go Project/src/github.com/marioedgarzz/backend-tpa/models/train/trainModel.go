package train

import (
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type Temp struct {
	gorm.Model
}

type Trains struct {
	TrainId        int `gorm:"primary_key;auto_increment"`
	TrainName      string
	TrainBasePrice int
}

func InitializeTrain(db *gorm.DB) {

	db.AutoMigrate(&Trains{})
}

func GetAllTrainNames() (interface{}, error){
	db, err := database.Connect()
	if err != nil {
		panic ("Connect db fail")
	}

	defer db.Close()

	var trainName []Trains

	db.Find(&trainName)

	return trainName, err
}