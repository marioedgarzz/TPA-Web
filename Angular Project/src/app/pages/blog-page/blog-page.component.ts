import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { Blogs, BlogCategories } from 'src/app/models/blogs';
import { Router } from '@angular/router';
import { ServerNotifyService } from 'src/app/services/chats/server-notify.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  constructor(private blogService : BlogService,
    private router : Router, private serverService : ServerNotifyService) { }

    private notifyMsg : any;
    private errorMsg : string;

    private evtTitle : string;
    private evtThumbnail : string;
    private slctCategory : string;

    private currShown : number = 2;

    scroll = (event) : void => {
      var elem = document.getElementById("all-events");
      var start = elem.offsetTop;
      var height = elem.offsetHeight;
      var end = start + height;
      var curr = window.scrollY + window.innerHeight;
      
      if(curr > end + 100) {
        this.currShown+=2;
      }
    }

  execCommand(cmd : any) {
    if(cmd === 'createlink') {
      let url = prompt("Enter the link here: ", "http:\/\/");
      document.execCommand(cmd, false, url);
    } else {
      document.execCommand(cmd, false, null);
    }
  }

  private blogs : Blogs[]

  private blogCategories : BlogCategories[]
  ngOnInit() {
    window.addEventListener('scroll',this.scroll)
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
    this.serverService.listen("blog").subscribe(
      (msg) => {
        alert(msg);
        this.notifyMsg = msg;
      }
    )
  }
  
  redirect(item : Blogs) {
    this.router.navigate(["/blog/" + item.BlogId]);
  }

  insert() {
    var itemContent = document.getElementById("output").innerHTML;

    if(itemContent == "" || itemContent == undefined) {
      this.errorMsg = "Content must be filled!"
    }
    else if(this.evtTitle == "" || this.evtTitle == undefined) {
      this.errorMsg = "Title must be filled!"
    }
    else if(this.evtThumbnail == "" || this.evtThumbnail == undefined) {
      this.errorMsg = "Thumbnail must be filled!"
    }
    else if(this.slctCategory == "" ||this.slctCategory == undefined) {
      this.errorMsg = "Category must be choosed!"
    }
    else {
      this.blogService.insertNewBlog(this.evtTitle,this.evtThumbnail,itemContent, this.slctCategory).subscribe(
        async result => {
          await (alert("Insert Success!"),
          this.serverService.emit("blog","New Blog occured!"))
        }
      )
    }

  }
}
