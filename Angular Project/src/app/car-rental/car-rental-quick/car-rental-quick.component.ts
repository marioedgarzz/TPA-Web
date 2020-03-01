import { Component, OnInit } from '@angular/core';
import { CarTransfer } from 'src/app/models/car-rental';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-rental-quick',
  templateUrl: './car-rental-quick.component.html',
  styleUrls: ['./car-rental-quick.component.scss']
})
export class CarRentalQuickComponent implements OnInit {

  txtPlace : string;
  dateFrom: string;
  dateTo : string ;
  numCars : number = 0;

  constructor(private router : Router) { }

  ngOnInit() {
    if(localStorage.getItem("CarRentalTransfer") != undefined) {
      var ct : CarTransfer = JSON.parse(localStorage.getItem("CarRentalTransfer"));
      this.txtPlace = ct.CarRentalPlace;
      this.dateFrom = ct.CarStartDate;
      this.dateTo = ct.CarEndDate;
      this.numCars = ct.CarQuantity
    }
  }

  search() {
    if(this.txtPlace == "" || this.txtPlace == undefined|| this.dateFrom == undefined || this.dateTo == undefined) {
      alert("All field must be filled!");
      return;
    }
    else if(this.numCars  == undefined || this.numCars<= 0) {
      alert("Must rent at least one car!");
      return;
    }

    // alert(this.txtPlace + " " + this.dateFrom + " " + this.dateTo + " " + this.numCars);
    
    var ct : CarTransfer = new CarTransfer();
    ct.CarRentalPlace = this.txtPlace;
    ct.CarStartDate = this.dateFrom;
    ct.CarEndDate = this.dateTo;
    ct.CarQuantity = this.numCars;
    window.localStorage.setItem("CarRentalTransfer",JSON.stringify(ct));
    
    if(this.router.url == "/car-rental" || this.router.url == "/") {
      this.router.navigate(["/car-rental-header"]);
    }
    else {
      window.location.reload();
    }

  }
}
