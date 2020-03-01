import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Promos } from 'src/app/models/promo';
import { PromosService } from 'src/app/services/promo/promos.service';

@Component({
  selector: 'app-promo-page',
  templateUrl: './promo-page.component.html',
  styleUrls: ['./promo-page.component.scss']
})
export class PromoPageComponent implements OnInit {

  constructor(private router : Router, private promoService : PromosService,
    private act : ActivatedRoute) { }

  private promos : Promos[]
  private id : number;
  private currPromo : Promos;
  ngOnInit() {
    this.id =+ this.act.snapshot.paramMap.get("id")
    this.setShareUrl()
    // this.copyText()
    var btn = document.getElementById("btnCopy")
    // new Clipboard(btn)
    this.promoService.getAllPromos().subscribe(
      async result => {
        await (this.promos = result,
          this.currPromo = result[this.id-1]);
      }
    )
  }
  
  private url : string;

  setShareUrl() {
    this.url = "127.0.0.1:4200" +  this.router.url;
    console.log(this.url)
    document.getElementById('share').innerHTML = `<div class="fb-share-button" style="margin: 20px" data-href="` + this.url +
        `" data-layout="button_count" data-size="small">` +
        `<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=` + this.url +
        `;src=sdkpreparse"class="fb-xfbml-parse-ignore">Share To Facebook </a></div>` +
        `<div class="line-it-button" data-lang="en" data-type="share-b" data-ver="3" data-url="` + this.url +
        `" data-color="default"data-size="small" data-count="true" style="display: none;"> Na</div>` +
        `<div style="margin: 20px"><a href="https://wa.me/?text=` + this.url + `"> Share to Whatsapp </a></div> `;
  }

  redirect(item : Promos) {
    this.router.navigate(['/promo/' + item.PromoId])
  }

  

  

}
