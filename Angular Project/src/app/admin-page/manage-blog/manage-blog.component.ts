import { Component, OnInit } from '@angular/core';
import { TrainService } from 'src/app/services/trains/train.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { ServerNotifyService } from 'src/app/services/chats/server-notify.service';
import { Blogs, BlogCategories } from 'src/app/models/blogs';
import { ManageBlogDeleteComponent } from '../manage-blog-delete/manage-blog-delete.component';
import { ManageBlogUpdateComponent } from '../manage-blog-update/manage-blog-update.component';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.scss']
})
export class ManageBlogComponent implements OnInit {

  constructor(private trainService : TrainService, 
    private dialog : MatDialog,
    private blogService : BlogService,
    private serverService : ServerNotifyService) { }

  blogs : Blogs[];
  blogCategories : BlogCategories[]
  
  private errorMsg : string;

  private blgTitle : string;
  private blgThumbnail : string;
  private slctBlogCategory : string;
  private blgDescription : string;
  private currPage : number = 1;

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(
      async result => {
        await (this.blogs = result);
      }
    )
    this.blogService.getAllBlogCategories().subscribe(
      async result => {
        await (this.blogCategories = result);
      }
    )
  }

  
  insert() {
    if(this.blgTitle == "" || this.blgTitle == undefined) {
      this.errorMsg = "Title must be filled!"
    }
    else if(this.blgThumbnail == "" || this.blgThumbnail == undefined) {
      this.errorMsg = "Thumbnail must be filled!"
    }
    else if(this.slctBlogCategory == "" ||this.slctBlogCategory == undefined) {
      this.errorMsg = "Category must be choosed!"
    }
    else if(this.blgDescription == "" ||this.blgDescription == undefined) {
      this.errorMsg = "Content must be filled!"
    }
    else {
      this.blogService.insertNewBlog(this.blgTitle,this.blgThumbnail,this.blgDescription, this.slctBlogCategory).subscribe(
        async result => {
          await this.check(result)
        }
      )
    }

  }

  check(result : any) {
    if(result.data.insertNewBlog == null) {
      alert("Insert Failed")
    }
    else {
      alert("Insert Success!");
      this.serverService.emit("blog","New Blog occured!");
      location.reload()
    }
  }

  update(item : Blogs) {
    var config : MatDialogConfig = new MatDialogConfig()
    config.width = "50%";
    config.height = "90%";
    config.maxHeight = "800px";
    config.minWidth = "370px";
    config.maxWidth = "800px";
    config.backdropClass="backdropColor";
    config.panelClass="panelColor";
    config.data = {
      blog : JSON.stringify(item)
    }
    this.dialog.open(ManageBlogUpdateComponent,config);
  }

  delete(item : Blogs) {
    var config : MatDialogConfig = new MatDialogConfig()
    config.width = "50%";
    config.height = "60%";
    config.maxHeight = "600px";
    config.minWidth = "370px";
    config.maxWidth = "800px";
    config.backdropClass="backdropColor";
    config.panelClass="panelColor";
    config.data = {
      blog : JSON.stringify(item)
    }
    this.dialog.open(ManageBlogDeleteComponent,config);
  }

  previous() {
    if(this.currPage == 1) {
      return;
    }
    this.currPage -= 1;
  }

  next() {
    let maxPage = (this.blogs.length / 10) + 1; 
    if(this.blogs.length % 10 == 0){
      maxPage -= 1
    }
    maxPage = Math.floor(maxPage)
    if(this.currPage < maxPage) {
      this.currPage += 1;
    }
  }

  getCan(i : number) {
    return i >= ((this.currPage-1) * 10) && i < (this.currPage*10);
  }

}
