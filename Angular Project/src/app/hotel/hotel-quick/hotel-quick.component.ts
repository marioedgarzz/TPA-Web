import { Component, OnInit } from '@angular/core';
import { HotelTransfer } from 'src/app/models/hotel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-quick',
  templateUrl: './hotel-quick.component.html',
  styleUrls: ['./hotel-quick.component.scss']
})
export class HotelQuickComponent implements OnInit {

  location: string;
  dateFrom: string;
  dateTo : string;
  nights : number;
  numGuest : number;
  numRoom : number;

  url : string;
  constructor(private router : Router) { }

  ngOnInit() {
    this.url = this.router.url;
    this.nights = 1;
    this.numGuest = 1;
    this.numRoom = 1;

    if(window.localStorage.getItem("hotelTransfer") != undefined) {
      var ht : HotelTransfer = JSON.parse(window.localStorage.getItem("hotelTransfer"));
      this.location = ht.HotelLocation;
      this.dateFrom = ht.HotelDateFrom;
      this.dateTo = ht.HotelDateTo;
      this.numGuest = ht.HotelNumGuest;
      this.numRoom = ht.HotelNumRoom;
    }
  }

  updateNight() {
    if(this.dateFrom == undefined || this.dateTo == undefined) {
      return;
    }
    this.nights = (new Date(this.dateTo).getTime() - new Date(this.dateFrom).getTime()) / (1000 * 3600 * 24);
  }

  search() {
    if(this.location == undefined || this.location == "" || this.dateFrom == undefined || this.dateTo == undefined) {
      alert("All fields must be filled!");
      return;
    }
    if(this.nights <= 0) {
      alert("Staying in hotel requires at least one day");
      return;
    }
    if(this.numGuest == 0 || this.numRoom == 0) {
      alert("Must have at least one people and one room")
      return;
    }

    var ht : HotelTransfer = new HotelTransfer();
    ht.HotelLocation = this.location;
    ht.HotelDateFrom = this.dateFrom;
    ht.HotelDateTo = this.dateTo;
    ht.HotelNumGuest = this.numGuest;
    ht.HotelNumRoom = this.numRoom ;

    window.localStorage.setItem("hotelTransfer",JSON.stringify(ht));

    if(this.router.url == "/hotel" || this.router.url == "/") {
      this.router.navigate(["/hotel-header"])
    }
    else {
      window.location.reload();
    }

  }

  searchAvailability() {

  }

  checkUrl() {
    return (this.url.startsWith('/hotel-header/') == false)
  }


}
