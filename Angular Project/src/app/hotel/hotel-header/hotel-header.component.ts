import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { HotelTransfer } from 'src/app/models/hotel';
import { HotelService } from 'src/app/services/hotels/hotel.service';
import { Hotels, HotelAreas, HotelFacilities, HotelFacilitiesLists } from 'src/app/models/hotels';
import { Router } from '@angular/router';
import { ServerNotifyService } from 'src/app/services/chats/server-notify.service';

@Component({
  selector: 'app-hotel-header',
  templateUrl: './hotel-header.component.html',
  styleUrls: ['./hotel-header.component.scss']
})
export class HotelHeaderComponent implements OnInit {

  dropDown : boolean[] = [
    false,false,false,false,false
  ];
  show_overlay : boolean;
  minValue : number = 0;
  maxValue: number = 15000000;
  location: String;
  showPrice : boolean;

  sortList : string[] = [
    "Recommended",
    "Price(lowest first)",
    "Price(highest first)",
    "Rating(highest first)"
  ]

  hotelList : HotelFacilitiesLists[];
  hotelNameListByLocation : Hotels[];
  hotelAreaByPlace : HotelAreas[];
  hotelFacilities : HotelFacilities[];

  filterHotelArea : boolean[];
  filterHotelFacilities : boolean[];
  filterSort : string = "Recommended";
  filterRating : boolean[] = Array(4);
  filterPriceBasedOn : string = "";
  filterHotelName : boolean[];

  notifyMessage : any;

  facilityFilter(idx : number) {
    this.filterHotelFacilities[idx] = !this.filterHotelFacilities[idx];
  }

  canShow = false;

  showMore() {
    this.canShow = true;
  }

  changeSort(sort : string) {
    this.filterSort = sort;
  }

  changePriceBasedOn(num : number) {
    if(num == 0) {
      this.filterPriceBasedOn = "Per Room Per Night";
    }
    else {
      this.filterPriceBasedOn = "Total Price";
    }
  }

  filterRate(num : number) {
    this.filterRating[num] = !this.filterRating[num];
  }

  changeArea(num : number) {
    this.filterHotelArea[num] = !this.filterHotelArea[num];
  }

  changeHotelNameFilter(num : number) {
    this.filterHotelName[num] = !this.filterHotelName[num];
  }

  constructor(private hotelService : HotelService, private router : Router,
    private serverService : ServerNotifyService) {
  }

  resetArea() {
    for(let i = 0 ; i < this.filterHotelArea.length ; i++) {
      this.filterHotelArea[i] = false;
    }

    var inputCheckbox = document.getElementsByTagName("input")

    for(let i = 0 ; i < inputCheckbox.length ; i++) {
      if(inputCheckbox[i].type == "checkbox" && inputCheckbox[i].name == "chkBoxArea") {
        inputCheckbox[i].checked = false;
      }
    }


  }
  
  ngOnInit() {
    var ht : HotelTransfer = JSON.parse(window.localStorage.getItem("hotelTransfer"));
    this.location = ht.HotelLocation;

    this.hotelService.getAllAreasByPlaceName(ht.HotelLocation).subscribe(
      async result => {
        await (this.hotelAreaByPlace = result,
          this.filterHotelArea = Array(result.length))
      }
    )

    this.hotelService.getAllFacilities().subscribe(
      async result => {
        await (this.hotelFacilities = result,
          this.filterHotelFacilities = Array(result.length + 1))
      }
    )

    this.hotelService.getAllHotelByLocation(ht.HotelLocation).subscribe(
      async result => {
        await (this.hotelNameListByLocation = result,
          this.filterHotelName = Array(result.length + 1));
      }
    ) 

    this.hotelService.getAllHotelsByPlaceName(ht.HotelLocation).subscribe(
      async result => {
        await (this.assignHotelResult(result))
      }
    )

    this.serverService.listen('hotel').subscribe((msg) => {
        alert("New Hotel Occured")
        this.notifyMessage = msg;
    })

    this.showPrice = false;
  }
  redirectMap() {
    this.router.navigate(["/hotel-header-map"]);
  }

  assignHotelResult(result : HotelFacilitiesLists[]) {
    var newResult : HotelFacilitiesLists[] = Array(result.length);
    let idx = 0;
    let currId = result[0].Hotel.HotelId;
    let currSize = 0;
    newResult[0] = result[0];
    for(let i = 0 ; i < result.length ; i++) {
      console.log(result[i].Hotel.HotelId)
      if(result[i].Hotel.HotelId == currId) {
        if(newResult[idx].HotelFacilityList == undefined) {
          newResult[idx].HotelFacilityList = Array(result.length);
        }
        newResult[idx].HotelFacilityList[currSize++] = result[i].HotelFacility
      }
      else {
        console.log("new")
        newResult[idx].HotelFacilityList.length = currSize;
        newResult[++idx] = result[i];
        newResult[idx].HotelFacilityList = Array(result.length);
        newResult[idx].HotelFacilityList[0] = result[i].HotelFacility
        currId = result[i].Hotel.HotelId;
        currSize = 1;
      }
    }

    newResult[idx].HotelFacilityList.length = currSize;
    
    newResult.length = idx + 1;

    this.hotelList = newResult;
  }

  filterPrice() {
    this.showPrice = !this.showPrice;
    this.show_overlay = true;
  }

  clickDropDown(val : number) {
    for(let i = 0; i < 5 ; i++) {
      if(this.dropDown[i] == true && i != (val-1)) {
        this.dropDown[i] = false;
      }
    }
    this.dropDown[val-1] = !this.dropDown[val-1]; 
    this.show_overlay = true;
    this.showPrice = false;
  }

  hide_overlay() {
    this.show_overlay = false;
    for(let i = 0 ; i < 5 ; i++) {
      this.dropDown[i] = false;
    }
    this.showPrice = false;
  }

  isFacility(str : string) : boolean {
    return str == "facility";
  }

  onInputChangeMin(event : MatSliderChange) {
    this.minValue = event.value
  }
  onInputChangeMax(event : MatSliderChange) {
    this.maxValue = event.value
  }

}
