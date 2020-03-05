package blogs

import (
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type Blogs struct {
	BlogId int `gorm:"primary_key;auto_increment"`
	BlogThumbnail string
	BlogTitle string
	BlogCategory BlogCategories `gorm:"foreign_key:BlogCategoryId"`
	BlogCategoryId int
	BlogContent string
	BlogViewCount int
}

func InitBlogs(db *gorm.DB) {
	InitBlogCategory(db)
	db.AutoMigrate(&Blogs{}).AddForeignKey("blog_category_id","blog_categories(blog_category_id)",
		"CASCADE","CASCADE")

}

func GetAllBlogs() ([]Blogs, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var blogs []Blogs

	db.Find(&blogs)

	for i,_ := range blogs {
		db.Model(&blogs[i]).Related(&blogs[i].BlogCategory,"blog_category_id")
	}

	return blogs, nil
}

func GetBlogsById(BlogId int) ([]Blogs, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var blogs []Blogs

	db.Where("blog_id = ?",BlogId).Find(&blogs)

	for i,_ := range blogs {
		db.Model(&blogs[i]).Related(&blogs[i].BlogCategory,"blog_category_id")
	}

	return blogs, nil
}

func InsertNewBlog(BlogTitle string, BlogThumbnail string, BlogContent string, BlogCategory string) (*Blogs, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	if len(BlogThumbnail) > 100 {
		return nil, nil
	}

	defer db.Close()

	var blogCategories []BlogCategories

	db.Where("blog_category_name = ?",BlogCategory).Find(&blogCategories)

	var blogs = Blogs{
		BlogThumbnail:  BlogThumbnail,
		BlogTitle:      BlogTitle,
		BlogCategoryId: blogCategories[0].BlogCategoryId,
		BlogContent:    BlogContent,
		BlogViewCount:  0,
	}

	db.Create(&blogs)

	return &blogs, nil

}

func UpdateBlog(BlogId int,BlogTitle string, BlogThumbnail string, BlogContent string, BlogCategory string) ([]Blogs, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var blogs []Blogs

	var blogCategories []BlogCategories

	db.Where("blog_category_name = ?",BlogCategory).Order("blog_view_count desc").Find(&blogCategories)


	db.Model(&blogs).Where("blog_id = ?",BlogId).UpdateColumns(
		Blogs{
		BlogThumbnail:  BlogThumbnail,
		BlogTitle:      BlogTitle,
		BlogCategoryId: blogCategories[0].BlogCategoryId,
		BlogContent:    BlogContent,
		BlogViewCount:  0,
	})

	return blogs, nil
}

func DeleteBlog(BlogId int) (interface{}, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	db.Where("blog_id = ?",BlogId).Delete(Blogs{})

	return Blogs{}, nil
}