package transactions

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
	"github.com/marioedgarzz/backend-tpa/models/train"
	"github.com/marioedgarzz/backend-tpa/models/user"
)

type Temp struct {
	gorm.Model
}

type TrainTransactions struct {
	TrainTransactionId int `gorm:"primary_key;auto_increment"`
	User user.Users `gorm:"foreign_key:UserId"`
	UserId int
	TrainSchedule train.TrainSchedules `gorm:"foreign_key:TrainScheduleId"`
	TrainScheduleId int
	TrainTransactionDate string
}

func InitTrainTransactions(db *gorm.DB) {

	db.AutoMigrate(&TrainTransactions{}).
		AddForeignKey("user_id","users(user_id)","CASCADE","CASCADE").
		AddForeignKey("train_schedule_id","train_schedules(train_schedule_id)","CASCADE","CASCADE")
}

func CreateNewTrainTransaction(TrainScheduleId int, UserId int, TrainTransactionDate string) (*TrainTransactions, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var trainTransactions = TrainTransactions{
		UserId:               UserId,
		TrainScheduleId:      TrainScheduleId,
		TrainTransactionDate: TrainTransactionDate,
	}

	fmt.Println(trainTransactions)

	if db.NewRecord(trainTransactions) {
		db.Create(&trainTransactions)
	}

	return &trainTransactions, nil
}

