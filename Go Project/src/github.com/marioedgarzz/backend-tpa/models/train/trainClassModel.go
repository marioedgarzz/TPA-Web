package train

import (
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type TrainClasses struct {
	TrainClassId          int `gorm:"primary_key;auto_increment"`
	TrainClassName        string
	TrainSubclassName     string
	TrainClassAdultPrice  int
	TrainClassInfantPrice int
}

func InitializeClass(db *gorm.DB) {

	db.AutoMigrate(&TrainClasses{})
}

func GetAllClasses() ([]TrainClasses, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var trainClasses []TrainClasses

	db.Find(&trainClasses)

	return trainClasses, nil
}
