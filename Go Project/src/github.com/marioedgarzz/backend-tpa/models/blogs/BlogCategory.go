package blogs

import "github.com/jinzhu/gorm"

type BlogCategory struct {
	BlogCategoryId int `gorm:"primary_key;auto_increment"`
	BlogCategoryName string
}

func InitBlogCategory(db *gorm.DB) {
	db.AutoMigrate(&BlogCategory{})
}