import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
    this.setShareUrl()
    // this.copyText()
    var btn = document.getElementById("btnCopy")
    // new Clipboard(btn)
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
        `<a href="https://wa.me/?text=` + this.url + `">Bagikan ke WhatsApp</a>`;
  }

}
