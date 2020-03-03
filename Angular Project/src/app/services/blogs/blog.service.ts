import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogs, BlogCategories } from 'src/app/models/blogs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private apollo : Apollo) { }

  getAllBlogs() : Observable<Blogs[]> {
    return this.apollo.watchQuery<any>({
      query : gql`
        query getAllBlogs {
          getAllBlogs {
            BlogCategory {
              BlogCategoryId
              BlogCategoryName
            }
            BlogContent
            BlogId
            BlogThumbnail
            BlogTitle
            BlogViewCount
          }
        }
      `
    }).valueChanges.pipe(
      map(res => res.data.getAllBlogs)
    )
  }

  insertNewBlog(BlogTitle : string, BlogThumbnail : string, BlogContent : string, BlogCategory : string) : Observable<any>{
    return this.apollo.mutate<any>({
      mutation : gql `
        mutation insertNewBlog($blogTitle : String, $blogThumbnail : String, 
          $blogContent : String, $blogCategory : String){
          insertNewBlog(BlogTitle : $blogTitle, BlogThumbnail: $blogThumbnail, 
            BlogContent : $blogContent, BlogCategory : $blogCategory) {
            BlogId
          }
        }
      `,
      variables : {
        "blogTitle": BlogTitle,
        "blogThumbnail": BlogThumbnail,
        "blogContent": BlogContent,
        "blogCategory": BlogCategory
      }
    })

    
  }

  updateBlog(BlogId : number,BlogTitle : string, BlogThumbnail : string, 
    BlogContent : string, BlogCategory : string) : Observable<any> {
    return this.apollo.mutate<any>({
      mutation : gql `
        mutation updateBlog($blogId : Int, $blogTitle : String, $blogThumbnail : String, 
          $blogContent : String, $blogCategory : String){
          UpdateBlog(BlogId : $blogId, BlogTitle : $blogTitle, BlogThumbnail: $blogThumbnail, 
            BlogContent : $blogContent, BlogCategory : $blogCategory) {
            BlogId
          }
        }
      `,
      variables : {
        "blogId" : BlogId,
        "blogTitle": BlogTitle,
        "blogThumbnail": BlogThumbnail,
        "blogContent": BlogContent,
        "blogCategory": BlogCategory
      }
    })
  }

  deleteBlog(blogId : number) : Observable<any>{
    return this.apollo.mutate({
      mutation : gql `
        mutation deleteBlog($blogId : Int){
          deleteBlog (BlogId: $blogId){
            BlogId
          }
        }
      `,
      variables : {
        "blogId" : blogId
      }
    })
  }

  getAllBlogCategories() : Observable<BlogCategories[]> {
    return this.apollo.watchQuery<any>({
      query : gql`
        query getAllBlogCategories{
          getAllBlogCategories {
            BlogCategoryName
          }
        }
      `
    }).valueChanges.pipe(
      map(res => res.data.getAllBlogCategories)
    )
  }
}
