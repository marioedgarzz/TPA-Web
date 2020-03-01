package promo

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type Promos struct {
	PromoId int `gorm:"primary_key;auto_increment"`
	PromoPicture string
	PromoHeader string
	PromoDescription string
	PromoPeriod string
	PromoTripPeriod string
	PromoPlatform string
	PromoCode string
	PromoCodeDescription string
}

func InitPromos(db *gorm.DB) {
	db.AutoMigrate(&Promos{})
}

func GetAllPromos() ([]Promos, error) {

	db, err := database.Connect()

	if err != nil {
		return nil, err
	}
	defer db.Close()

	var promos []Promos

	db.Find(&promos)

	return promos, nil
}
