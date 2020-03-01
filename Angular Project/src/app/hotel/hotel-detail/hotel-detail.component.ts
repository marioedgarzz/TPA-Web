import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/services/hotels/hotel.service';
import { HotelFacilitiesLists, HotelFacilities } from 'src/app/models/hotels';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  constructor(private router : Router, private act : ActivatedRoute,
    private hotelService : HotelService) { 

  }

  private currHotelList : HotelFacilitiesLists[];

  private currHotel : HotelFacilitiesLists;

  private id : number;
  private url : string;
  ngOnInit() {
    this.id =+ this.act.snapshot.paramMap.get("id")
    this.hotelService.getAllHotels().subscribe(
      async result => {
        await this.assignResult(result);
        
      }
    )
    this.setShareUrl()
  }

  assignResult(result : HotelFacilitiesLists[]) {
    let idx = 0;
    this.currHotelList = Array(result.length);
    console.log("ccc")
    for(let i = 0 ; i < result.length ; i++) {
      if(this.id == result[i].Hotel.HotelId) {
        console.log("ddd")
        this.currHotelList[idx++] = result[i];
        
      }
    }
    this.currHotelList.length = idx;
    this.currHotel = this.currHotelList[0];
    
  }

  setShareUrl() {
    this.url = "127.0.0.1:4200" +  this.router.url;
    console.log(this.url)
    document.getElementById('share').innerHTML = `<div class="fb-share-button" style="margin: 20px" data-href="` + this.url +
        `" data-layout="button_count" data-size="small">` +
        `<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=` + this.url +
        `;src=sdkpreparse"class="fb-xfbml-parse-ignore">Share To Facebook </a></div>`;
  }

  sendThroughEmail() {
    location.href = "mailto:?subject=Share Tiket.com&body=Link : " + this.url
  }

}
