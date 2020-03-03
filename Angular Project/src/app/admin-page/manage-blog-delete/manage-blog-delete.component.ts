import { Component, OnInit, Inject } from '@angular/core';
import { ManageEventDeleteComponent } from '../event/manage-event-delete/manage-event-delete.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { Blogs } from 'src/app/models/blogs';

@Component({
  selector: 'app-manage-blog-delete',
  templateUrl: './manage-blog-delete.component.html',
  styleUrls: ['./manage-blog-delete.component.scss']
})
export class ManageBlogDeleteComponent implements OnInit {

  constructor(private MatRef : MatDialogRef<ManageEventDeleteComponent>,
    private blogService : BlogService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  private blog : Blogs;

  ngOnInit() {
    this.blog = JSON.parse(this.data.blog)
  }

  yes() {
    this.blogService.deleteBlog(this.blog.BlogId).subscribe(
      async result => {
        await (alert("Delete Success!"), window.location.reload());
      }
    )
  }

  no() {
    this.MatRef.close();
  }

}
