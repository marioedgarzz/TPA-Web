package blogs

import (
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type Blogs struct {
	BlogId int `gorm:"primary_key;auto_increment"`
	BlogThumbnail string
	BlogTitle string
	BlogCategory BlogCategory `gorm:"foreign_key:BlogCategoryId"`
	BlogCategoryId int
	BlogContent string
}

func InitBlogs(db *gorm.DB) {
	InitBlogCategory(db)
	db.AutoMigrate(&Blogs{})


}

func GetAllBlogs() ([]Blogs, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var blogs []Blogs

	db.Find(&blogs)

	return blogs, nil
}