package hotels

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type Hotels struct {
	HotelId int `gorm:"primary_key;auto_increment"`
	HotelName string
	HotelPicture string
	HotelCategory HotelCategories `gorm:"foreign_key:HotelCategoryId"`
	HotelCategoryId int
	HotelRating float64
	HotelPrice int
	HotelDiscountPrice int
	HotelPriceBasedOn string
	HotelLeft int
	HotelArea HotelAreas `gorm:"foreign_key:HotelAreaId"`
	HotelAreaId int
	HotelInformation string
	HotelLocationLatitude float64
	HotelLocationLongitude float64
	HotelAddress string
}

func InitHotels(db *gorm.DB) {
	InitHotelPlace(db)
	InitHotelArea(db)
	InitHotelCategories(db)
	InitHotelFacilities(db)


	db.AutoMigrate(&Hotels{}).
		AddForeignKey("hotel_category_id","hotel_categories(hotel_category_id)","CASCADE","CASCADE").
		AddForeignKey("hotel_area_id","hotel_areas(hotel_area_id)","CASCADE","CASCADE")

	InitHotelFacilityLists(db)
}

func GetAllHotelsByPlace(hotelPlace string) (interface{}, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var hotels []HotelFacilitiesLists

	db.Joins("JOIN hotels on hotels.hotel_id = hotel_facilities_lists.hotel_id").
		Joins("JOIN hotel_facilities on hotel_facilities.hotel_facility_id = hotel_facilities_lists.hotel_facility_id").
		Joins("JOIN hotel_areas hArea on hArea.hotel_area_id = hotels.hotel_area_id").
		Joins("JOIN hotel_places on hotel_places.hotel_place_id = hArea.hotel_place_id").
		Where("hotel_place_name = ?", hotelPlace).Order("hotels.hotel_id").Find(&hotels)

	for i, _ := range hotels {
		db.Model(&hotels[i]).Related(&hotels[i].HotelFacility,"hotel_facility_id").
			Related(&hotels[i].Hotel,"hotel_id")
		db.Model(&hotels[i].Hotel).Related(&hotels[i].Hotel.HotelCategory,"hotel_category_id").
			Related(&hotels[i].Hotel.HotelArea,"hotel_area_id")

		db.Model(&hotels[i].Hotel.HotelArea).Related(&hotels[i].Hotel.HotelArea.HotelPlace,"hotel_place_id")
	}

	return hotels, nil
}

func GetAllHotels() (interface{}, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var hotels []HotelFacilitiesLists

	db.Find(&hotels)

	for i, _ := range hotels {
		db.Model(&hotels[i]).Related(&hotels[i].HotelFacility,"hotel_facility_id").
			Related(&hotels[i].Hotel,"hotel_id")
		db.Model(&hotels[i].Hotel).Related(&hotels[i].Hotel.HotelCategory,"hotel_category_id").
			Related(&hotels[i].Hotel.HotelArea,"hotel_area_id")

		db.Model(&hotels[i].Hotel.HotelArea).Related(&hotels[i].Hotel.HotelArea.HotelPlace,"hotel_place_id")
	}

	return hotels, nil
}

func GetAllHotelNamesBasedOnLocation(location string) (interface{}, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var hotels []Hotels

	db.Joins("JOIN hotel_areas on hotels.hotel_area_id = hotel_areas.hotel_area_id").
		Joins("JOIN hotel_places on hotel_places.hotel_place_id = hotel_areas.hotel_place_id").
		Where("hotel_place_name = ?",location).Find(&hotels)

	return hotels, nil
}

func GetAllHotelCategories() (i interface{}, e error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var hotelCategories []HotelCategories

	db.Find(&hotelCategories)

	return hotelCategories, nil
}

// admin
func InsertNewHotel(HotelName string, HotelPicture string, HotelLocation string, HotelRating float64,
	HotelAddress string, HotelFacilities [100]int, length int, HotelCategoryName string, HotelInformation string) (*Hotels, error){

	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var findArea []HotelAreas

	var findCategory []HotelCategories

	db.Where("hotel_category_name = ?",HotelCategoryName).Find(&findCategory)

	if len(findCategory) == 0  {
		return nil, err
	}

	db.Where("hotel_area_name = ?",HotelLocation).Find(&findArea)

	if len(findArea) == 0 {
		return nil, nil
	}

	if len(HotelAddress) > 100 {
		return nil, nil
	}

	var hotel Hotels

	hotel = Hotels{
		HotelName:              HotelName,
		HotelPicture:           HotelPicture,
		HotelCategoryId:        findCategory[0].HotelCategoryId,
		HotelRating:            HotelRating,
		HotelPrice:             800000,
		HotelDiscountPrice:     700000,
		HotelPriceBasedOn:      "Total Price",
		HotelLeft:              8,
		HotelAreaId:            findArea[0].HotelAreaId,
		HotelLocationLatitude:  93.11,
		HotelLocationLongitude: 37.11,
		HotelInformation: 		HotelInformation,
		HotelAddress: HotelAddress,
	}

	db.Create(&hotel)

	for iterator,_ := range HotelFacilities {
		if iterator == (length - 1) {
			break
		}
		var hotelFacilityList = HotelFacilitiesLists{
			HotelFacilityId:     HotelFacilities[iterator],
			HotelId: hotel.HotelId,
		}
		db.Create(&hotelFacilityList)
	}

	return &hotel, nil
}

func UpdateHotels(HotelId int ,HotelName string, HotelPicture string, HotelLocation string, HotelRating float64,
	HotelAddress string, hotelFacilitiesId [100]int, length int, HotelCategoryName string, HotelInformation string) ([]Hotels, error){

	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var findCategory []HotelCategories

	db.Where("hotel_category_name = ?",HotelCategoryName).Find(&findCategory)

	if len(findCategory) == 0  {
		return nil, err
	}

	if len(HotelAddress) > 100 {
		return nil, nil
	}

	var findArea []HotelAreas

	db.Where("hotel_area_name = ?",HotelLocation).Find(&findArea)

	if len(findArea) == 0 {
		return nil, nil
	}

	var hotels []Hotels

	db.Model(&hotels).Where("hotel_id = ?",HotelId).UpdateColumns(
		Hotels{
			HotelName:              HotelName,
			HotelPicture:           HotelPicture,
			HotelCategoryId:        findCategory[0].HotelCategoryId,
			HotelRating:            HotelRating,
			HotelPrice:             800000,
			HotelDiscountPrice:     700000,
			HotelPriceBasedOn:      "Total Price",
			HotelLeft:              8,
			HotelAreaId:            findArea[0].HotelAreaId,
			HotelLocationLatitude:  93.11,
			HotelLocationLongitude: 37.11,
			HotelInformation: HotelInformation,
			HotelAddress: HotelAddress,
		},
		)

	db.Where("hotel_id = ?",HotelId).Delete(HotelFacilitiesLists{})

	for iterator,_ := range hotelFacilitiesId {
		if iterator == (length - 1)  {
			break
		}
		var facility = HotelFacilitiesLists{
			HotelFacilityId:     hotelFacilitiesId[iterator],
			HotelId:             HotelId,
		}
		db.Create(&facility)
	}

	return hotels, nil
}

func DeleteHotels(HotelId int) (interface{}, error) {
	db, err := database.Connect()
	if err != nil {
		return nil, err
	}

	defer db.Close()

	db.Where("hotel_id = ?",HotelId).Delete(Hotels{})

	return Hotels{}, nil
}

func GetAllArea() ([]HotelAreas, error) {
	db, err := database.Connect()
	if err != nil {
		return nil, err
	}

	defer db.Close()

	var findArea []HotelAreas

	db.Find(&findArea)

	return findArea, nil
}