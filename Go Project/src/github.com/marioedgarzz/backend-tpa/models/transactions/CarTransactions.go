package transactions

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
	"github.com/marioedgarzz/backend-tpa/models/car_rental"
)

type CarTransactions struct {
	CarTransactionId int `gorm:"primary_key;auto_increment"`
	CarFromVendor car_rental.CarFromVendors `gorm:"foreign_key:CarFromVendorId"`
	CarFromVendorId int
	UserId int
	CarTransactionDate string
}

func InitCarTransactions(db *gorm.DB) {
	db.AutoMigrate(&CarTransactions{}).
		AddForeignKey("car_from_vendor_id","car_from_vendors(car_from_vendor_id)","CASCADE","CASCADE").
		AddForeignKey("user_id","users(user_id)","CASCADE","CASCADE")
}

func CreateNewCarTransaction(CarFromVendorId int, UserId int, CarTransactionDate string) (*CarTransactions, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var carTransactions = CarTransactions{
		CarFromVendorId:    CarFromVendorId,
		UserId:             UserId,
		CarTransactionDate: CarTransactionDate,
	}

	if db.NewRecord(carTransactions) {
		db.Create(&carTransactions)
	}

	return &carTransactions, nil
}