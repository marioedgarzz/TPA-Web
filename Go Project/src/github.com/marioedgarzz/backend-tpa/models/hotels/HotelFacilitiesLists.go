package hotels

import "github.com/jinzhu/gorm"

type HotelFacilitiesLists struct {
	HotelFacilityListId int `gorm:"primary_key;auto_increment"`
	HotelFacility HotelFacilities `gorm:"foreign_key:HotelFacilityId"`
	HotelFacilityId int
	Hotel Hotels `gorm:"foreign_key:HotelId"`
	HotelId int
}

func InitHotelFacilityLists (db *gorm.DB) {
	db.AutoMigrate(&HotelFacilitiesLists{}).AddForeignKey("hotel_facility_id",
		"hotel_facilities(hotel_facility_id)","CASCADE","CASCADE").
		AddForeignKey("hotel_id","hotels(hotel_id)","CASCADE","CASCADE")


}
