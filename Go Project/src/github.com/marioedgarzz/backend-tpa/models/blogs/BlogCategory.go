package blogs

import (
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type BlogCategories struct {
	BlogCategoryId int `gorm:"primary_key;auto_increment"`
	BlogCategoryName string
}

func InitBlogCategory(db *gorm.DB) {
	db.AutoMigrate(&BlogCategories{})
}

func GetAllBlogCategories() ([]BlogCategories, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var blogCategories []BlogCategories

	db.Find(&blogCategories)

	return blogCategories, nil
}