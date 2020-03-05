package adminResolvers

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/models/blogs"
)

func InsertNewBlog(p graphql.ResolveParams) (interface{}, error) {

	BlogTitle := p.Args["BlogTitle"].(string)
	BlogThumbnail := p.Args["BlogThumbnail"].(string)
	BlogContent := p.Args["BlogContent"].(string)
	BlogCategory := p.Args["BlogCategory"].(string)

	return blogs.InsertNewBlog(BlogTitle,BlogThumbnail,BlogContent,BlogCategory)
}

func UpdateBlog(p graphql.ResolveParams) (interface{}, error) {

	BlogId := p.Args["BlogId"].(int)
	BlogTitle := p.Args["BlogTitle"].(string)
	BlogThumbnail := p.Args["BlogThumbnail"].(string)
	BlogContent := p.Args["BlogContent"].(string)
	BlogCategory := p.Args["BlogCategory"].(string)
	return blogs.UpdateBlog(BlogId,BlogTitle,BlogThumbnail,BlogContent,BlogCategory)

}

func DeleteBlog(p graphql.ResolveParams) (interface{}, error) {
	BlogId := p.Args["BlogId"].(int)

	return blogs.DeleteBlog(BlogId)
}