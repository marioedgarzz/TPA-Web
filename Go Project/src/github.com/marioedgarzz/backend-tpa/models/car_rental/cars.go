package car_rental

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm"
)

type Cars struct {
	CarId int `gorm:"primary_key;auto_increment"`
	CarBrand CarBrands `gorm:"foreign_key:CarBrandId"`
	CarBrandId int
	CarModel CarModels `gorm:"foreign_key:CarModelId"`
	CarModelId int
	//CarVendors []CarVendors `gorm:"foreign_key:CarVendorId"`
	//CarVendorId int
	CarPicture string
	//CarPrice int
	CarPassengerCapacity int
	CarBaggageCapacity int
}

func InitCars(db *gorm.DB) {

	db.AutoMigrate(&Cars{}).
		AddForeignKey("car_model_id","car_models(car_model_id)","CASCADE","CASCADE").
		AddForeignKey("car_brand_id","car_brands(car_brand_id)","CASCADE","CASCADE")
		//AddForeignKey("car_vendor_id","car_vendors(car_vendor_id)","CASCADE","CASCADE")

}
