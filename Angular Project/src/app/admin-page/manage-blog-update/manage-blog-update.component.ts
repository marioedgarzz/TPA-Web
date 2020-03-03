import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { ServerNotifyService } from 'src/app/services/chats/server-notify.service';
import { Blogs, BlogCategories } from 'src/app/models/blogs';

@Component({
  selector: 'app-manage-blog-update',
  templateUrl: './manage-blog-update.component.html',
  styleUrls: ['./manage-blog-update.component.scss']
})
export class ManageBlogUpdateComponent implements OnInit {

  constructor(private MatRef : MatDialogRef<ManageBlogUpdateComponent>,
    private blogService : BlogService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

    
  blog : Blogs;
  blogCategories : BlogCategories[]
  slctCategoryType: string = "";
  blgTitle : string;
  blgContent : string;
  errorMsg : string;
  blgThumbnail : string;
  ngOnInit() {
    this.blog = JSON.parse(this.data.blog)

    this.blogService.getAllBlogCategories().subscribe(
      async result => {
        await(
          this.blogCategories = result
        )
      }
    )
  }

  update() {
    if(this.blgTitle == "" || this.blgTitle == undefined) {
      this.errorMsg = "Title Must be Filled!"
    }
    else if(this.blgContent == "" || this.blgContent == undefined) {
      this.errorMsg = "Content Must Be Filled!";
    }
    else if(this.slctCategoryType == "" || this.slctCategoryType == undefined) {
      this.errorMsg = "Category must be filled!";
    }
    else if(this.blgThumbnail == "" || this.blgThumbnail == undefined) {
      this.errorMsg = "Thumbnail must be filled!";
    }
    else {
      this.blogService.updateBlog(this.blog.BlogId,this.blgTitle, this.blgThumbnail, this.blgContent, this.slctCategoryType).subscribe(
          async result => {
            await( alert("Update Success!"),
            window.location.reload());
          }
      )

    }
  }

}
