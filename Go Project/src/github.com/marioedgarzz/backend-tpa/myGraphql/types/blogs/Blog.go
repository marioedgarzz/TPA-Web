package blogs

import "github.com/graphql-go/graphql"

var blogs *graphql.Object

func GetBlogsType() *graphql.Object {
	if blogs == nil {
		blogs = graphql.NewObject(graphql.ObjectConfig{
			Name:        "Blogs",
			Fields:      graphql.Fields{
				"BlogId": &graphql.Field{
					Type: graphql.Int,
				},
				"BlogThumbnail" : &graphql.Field{
					Type:  graphql.String,
				},
				"BlogTitle" : &graphql.Field{
					Type:  graphql.String,
				},
				"BlogCategory" : &graphql.Field{
					Type: GetBlogCategoryType(),
				},
				"BlogContent" : &graphql.Field{
					Type:  graphql.String,
				},
				"BlogViewCount" : &graphql.Field{
					Type: graphql.Int,
				},
			},
			Description: "Get Blog Types",
		})
	}
	return blogs
}