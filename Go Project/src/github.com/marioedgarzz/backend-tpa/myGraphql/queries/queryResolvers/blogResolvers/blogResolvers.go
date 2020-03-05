package blogResolvers

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/models/blogs"
)

func GetAllBlogs(p graphql.ResolveParams) (interface{}, error) {

	return blogs.GetAllBlogs()
}

func GetBlogById(p graphql.ResolveParams) (interface{}, error) {

	BlogId := p.Args["BlogId"].(int)

	return blogs.GetBlogsById(BlogId)
}

func GetAllBlogCategories(p graphql.ResolveParams) (interface{}, error) {
	return blogs.GetAllBlogCategories()
}
