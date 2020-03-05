import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Blogs } from 'src/app/models/blogs';
import { BlogService } from 'src/app/services/blogs/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  constructor(private router : Router, private act : ActivatedRoute,
    private blogService : BlogService) { }

  private currBlog : Blogs;
  private contents : string[];
  private otherStories : Blogs[];

  ngOnInit() {
    this.refresh();
    
    // new Clipboard(btn)
  }

  refresh() {
    var id =+ this.act.snapshot.paramMap.get("id")

    this.blogService.getBlogById(id).subscribe(
      async result => {
        await (this.currBlog = result[0],
          this.contents = this.currBlog.BlogContent.split("\n"),
          this.blogService.getAllBlogs().subscribe(
            async result => {
              await this.assign(result);
            }
          )
          )
      }
    )
    this.setShareUrl()
    var btn = document.getElementById("btnCopy")
  }

  redirects(item : Blogs) {
    this.router.navigate(["/blog/" + item.BlogId])
    setTimeout(() => {
      
      this.refresh();
    }, 1);
  }

  assign(result : Blogs[]) {
    this.otherStories = Array(5)
    let currIdx = 0;
    result.forEach(element => {
      if(element.BlogId != this.currBlog.BlogId) {
        if(currIdx != 5) {
          this.otherStories[currIdx] = element;
          currIdx++;
        }
      }
    });

    this.otherStories.length = 5;
  }

  private url : string;

  setShareUrl() {
    this.url = "127.0.0.1:4200" +  this.router.url;
    console.log(this.url)
    document.getElementById('share').innerHTML = `<div class="fb-share-button" data-href="` + this.url +
        `" data-layout="button_count" data-size="small">` +
        `<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=` + this.url +
        `;src=sdkpreparse"class="fb-xfbml-parse-ignore">Share</a></div>` +
        `<div class="line-it-button" data-lang="en" data-type="share-b" data-ver="3" data-url="` + this.url +
        `" data-color="default"data-size="small" data-count="true" style="display: none;"></div>` +
        `<a style="margin:10px" href="https://wa.me/?text=` + this.url + `">Bagikan ke WhatsApp</a>`;
  }

}
