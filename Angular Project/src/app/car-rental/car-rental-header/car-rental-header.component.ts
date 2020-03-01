import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarTransfer, CarFromVendors, CarModels, CarBrands } from 'src/app/models/car-rental';
import { CarRentalService } from 'src/app/services/car-rentals/car-rental.service';

@Component({
  selector: 'app-car-rental-header',
  templateUrl: './car-rental-header.component.html',
  styleUrls: ['./car-rental-header.component.scss']
})
export class CarRentalHeaderComponent implements OnInit {

  location: string;
  dateFrom: string;
  dateTo : string;
  dateDiff : number;
  onFocus : boolean = false;

  carList : CarFromVendors[];
  carModelList : CarModels[];
  carBrandList : CarBrands[];

  filterCarModel : boolean[];

  minPrice : number = 0;
  maxPrice : number = 1500000;

  reset() {
    this.minPrice = 0;
    this.maxPrice = 1500000;
    for(let i = 0 ; i < this.filterCarModel.length ; i++) {
      this.filterCarModel[i] = false;
    }

    for(let i = 0 ; i < this.filterCarBrand.length ; i++) {
      this.filterCarBrand[i] = false;
    }
    for(let i = 0 ; i < 3 ; i++) {
      this.filterPassenger[i] = false;
    }

    var temp = document.getElementsByTagName("input")

    for(let i = 0 ; i < temp.length ; i++) {
      if(temp[i].type == "checkbox") {
        temp[i].checked = false;
      }
    }
  }

  changeMin() {
    if(this.minPrice < 0) {
      this.minPrice = 0;
    }
    else if(this.minPrice > this.maxPrice) {
      this.minPrice = this.maxPrice;
    }
  }

  changeMax() {
    if(this.maxPrice > 1500000) {
      this.maxPrice = 1500000;
    }
    else if(this.maxPrice < this.minPrice) {
      this.maxPrice = this.minPrice;
    }
  }

  filterPassengers(num : number) {
    if(num == 3) {
      for(let i = 0 ; i < 3 ; i++) {
        this.filterPassenger[i] = false;
      }
      return;  
    }
    if(this.filterPassenger[num] == true) {
      this.filterPassenger[num] = false;
      return;
    }
    for(let i = 0 ; i < 3 ; i++) {
      this.filterPassenger[i] = false;
    }
    this.filterPassenger[num] = true;
  }

  filterCarBrands(i : number) {
    this.filterCarBrand[i] = !this.filterCarBrand[i]
  }

  filterCarModels(i : number) {
    this.filterCarModel[i] = !this.filterCarModel[i];
  }
  filterCarBrand : boolean[];
  filterPassenger : boolean[] = Array(4);

  constructor(private router : Router, private carService : CarRentalService) { }

  getSize() {
    return this.carList.length;
  }

  displayItem : number = 3;
  everyItemHeight : number;

  // scrollListen() {
  //   );
  //     // console.log("Offset top : " + elem.offsetTop);
  //     // console.log("Offset bottom : " + elem.offsetHeight)
  //     // console.log("Scroll height : " + document.documentElement.scrollHeight);
  //     // console.log("Windowscrooly + innerheight : " + (window.scrollY + window.innerHeight))
  // }

  currShown : number = 2;

  scroll = (event) : void => {
    var elem = document.getElementById("car-container");
    var start = elem.offsetTop;
    var height = elem.offsetHeight;
    var end = start + height;
    var curr = window.scrollY + window.innerHeight;
    
    if(curr > end + 100) {
      this.currShown++;
    }
  }

  addScrollListener() {
    window.addEventListener('scroll', this.scroll);
    //   console.log("Offset top : " + elem.offsetTop);
    //   console.log("Offset bottom : " + elem.offsetHeight)
    //   console.log("Scroll height : " + document.documentElement.scrollHeight);
    //   console.log("Windowscrooly + innerheight : " + (window.scrollY + window.innerHeight))
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll);
  }

  ngOnInit() {
    if(window.localStorage.getItem("CarRentalTransfer") == undefined) {
      this.router.navigate(['/car-rental']);
    }
    else {
      var ct : CarTransfer = JSON.parse(window.localStorage.getItem("CarRentalTransfer"));
      this.location = ct.CarRentalPlace;
      this.dateFrom = ct.CarStartDate;
      this.dateTo = ct.CarEndDate;
      this.dateDiff = (new Date(this.dateTo).valueOf() - new Date(this.dateFrom).valueOf()) / (1000 * 3600 * 24);
    }
    this.carService.getAllCarModels().subscribe(
      async result => {
        this.carModelList = result
        await(this.filterCarModel = Array(this.carModelList.length + 1),
        
        this.carService.getAllCarBrands().subscribe(
          async result => {
            this.carBrandList = result;
            await(this.filterCarBrand = Array(this.carBrandList.length + 1),
            this.carService.getCarByRentalPlace(this.location).subscribe(
              async result => {
                await(this.carList = result, this.addScrollListener());
              }
            )
            
            );
          }
        )
        
        );
      }
    )
  }

  selectItem(item : CarFromVendors) {
    // console.log(item)
    // console.log(item.CarFromVendorId)
    CarRentalService.setCurrentDetail(item.Car.CarId);
    this.router.navigate(["/car-detail"]);
  }

  btnChangeClick() {
    this.onFocus = true;
  }

  getClicked() {
    this.onFocus = !this.onFocus;
  }

}
