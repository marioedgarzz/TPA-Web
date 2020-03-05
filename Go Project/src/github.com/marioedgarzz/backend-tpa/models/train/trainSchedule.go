package train

import (
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
	"time"
)

type TrainSchedules struct {
	TrainScheduleId  int    `gorm:"primary_key;auto_increment"`
	Train	      	 Trains `gorm:"foreign_key:TrainId"`
	TrainId          int
	TrainClass		 TrainClasses `gorm:"foreign_key:TrainClassId"`
	TrainClassId     int
	TrainPlaceFrom   TrainPlaces `gorm:"foreign_key:TrainPlaceFromId"`
	TrainPlaceFromId int
	TrainPlaceTo     TrainPlaces `gorm:"foreign_key:TrainPlaceToId"`
	TrainPlaceToId   int
	TrainDate	     string
	TrainTimeFrom    string
	TrainTimeTo      string
}

func InitializeSchedule(db *gorm.DB) {

	db.AutoMigrate(&TrainSchedules{}).
		AddForeignKey("train_id", "trains(train_id)", "CASCADE", "CASCADE").
		AddForeignKey("train_class_id", "train_classes(train_class_id)", "CASCADE", "CASCADE").
		AddForeignKey("train_place_from_id", "train_places(train_place_id)", "CASCADE", "CASCADE").
		AddForeignKey("train_place_to_id", "train_places(train_place_id)", "CASCADE", "CASCADE")
}

func GetAllTrainSchedule(trainPlaceFrom string, trainPlaceTo string) ([]TrainSchedules, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}
	defer db.Close()

	var trainSchedules []TrainSchedules

	db.Joins("JOIN train_places trainFrom ON trainFrom.train_place_id = train_schedules.train_place_from_id").
		Joins("JOIN train_places trainTo ON trainTo.train_place_id = train_schedules.train_place_to_id").
		Where("trainFrom.train_place_name = ? AND trainTo.train_place_name = ?",
		trainPlaceFrom,trainPlaceTo).Find(&trainSchedules)

	for i, _ := range trainSchedules {
		db.Model(&trainSchedules[i]).Related(&trainSchedules[i].TrainClass, "TrainClassId").
			Related(&trainSchedules[i].TrainPlaceFrom, "TrainPlaceFromId").
			Related(&trainSchedules[i].TrainPlaceTo, "TrainPlaceToId").
			Related(&trainSchedules[i].Train, "TrainId")
	}

	return trainSchedules, nil
}

func GetEveryTrainSchedules() ([]TrainSchedules, error) {
	db, err:= database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var trainSchedules []TrainSchedules

	db.Find(&trainSchedules)

	for i,_ := range trainSchedules {
		db.Model(&trainSchedules[i]).Related(&trainSchedules[i].Train,"train_id").
			Related(&trainSchedules[i].TrainClass,"train_class_id").
			Related(&trainSchedules[i].TrainPlaceFrom,"train_place_from_id").
			Related(&trainSchedules[i].TrainPlaceTo,"train_place_to_id")
	}

	return trainSchedules, nil
}

// admin
func InsertNewTrainSchedule(TrainName string, TrainTimeFrom string, TrainTimeTo string, TrainClassName string) (*TrainSchedules, error){

	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	if len(TrainTimeFrom) > 10 {
		return nil, nil
	}


	var trains []Trains
	db.Where("train_name = ?",TrainName).Find(&trains)

	var trainClasses []TrainClasses
	db.Where("train_class_name = ?",TrainClassName).Find(&trainClasses)

	var trainSchedule = TrainSchedules{
		TrainId:          trains[0].TrainId,
		TrainClassId:     trainClasses[0].TrainClassId,
		TrainPlaceFromId: 2,
		TrainPlaceToId:   1,
		TrainDate:        time.Now().Format("01-02-2006"),
		TrainTimeFrom:    TrainTimeFrom,
		TrainTimeTo:      TrainTimeTo,
	}

	if db.NewRecord(&trainSchedule) {
		db.Save(&trainSchedule)
	}

	return &trainSchedule, nil

}

func UpdateTrainSchedule(TrainScheduleId int,TrainName string, TrainTimeFrom string, TrainTimeTo string, TrainClassName string) ([]TrainSchedules, error) {
	db, err:= database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var trainSchedule []TrainSchedules

	var trainNames[] Trains
	db.Where("train_name = ?",TrainName).Find(&trainNames)

	var trainClasses[] TrainClasses
	db.Where("train_class_name = ?",TrainClassName).Find(&trainClasses)

	db.Model(&trainSchedule).Where("train_schedule_id = ?",TrainScheduleId).UpdateColumns(
		TrainSchedules{
			TrainId:          trainNames[0].TrainId,
			TrainClassId:     trainClasses[0].TrainClassId,
			TrainTimeFrom:    TrainTimeFrom,
			TrainTimeTo:      TrainTimeTo,
		})

	return trainSchedule, nil
}

func DeleteTrainSchedule(TrainScheduleId int) (interface{}, error) {
	db, err := database.Connect()
	if err != nil {
		return nil, err
	}

	defer db.Close()

	db.Where("train_schedule_id = ?",TrainScheduleId).Delete(TrainSchedules{})

	return TrainSchedules{}, nil
}

func GetTrainScheduleById(Id int) ([]TrainSchedules, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var trainSchedules []TrainSchedules

	db.Where("train_schedule_id = ?",Id).Find(&trainSchedules)

	for i, _ := range trainSchedules {
		db.Model(&trainSchedules[i]).Related(&trainSchedules[i].Train, "train_id").
			Related(&trainSchedules[i].TrainClass, "train_class_id").
			Related(&trainSchedules[i].TrainPlaceFrom, "train_place_from_id").
			Related(&trainSchedules[i].TrainPlaceTo, "train_place_to_id")
	}

	return trainSchedules, nil
}