package blogs

import "github.com/graphql-go/graphql"

var blogCategories *graphql.Object

func GetBlogCategoryType() *graphql.Object {
	if blogCategories == nil {
		blogCategories = graphql.NewObject(graphql.ObjectConfig{
			Name:        "BlogCategories",
			Fields:      graphql.Fields{
				"BlogCategoryId": &graphql.Field{
					Type: graphql.Int,
				},
				"BlogCategoryName" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Blog Category Type",
		})
	}
	return blogCategories
}
