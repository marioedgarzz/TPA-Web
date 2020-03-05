import { Pipe, PipeTransform } from '@angular/core';
import { HotelFacilitiesLists, HotelFacilities, Hotels, HotelAreas } from '../models/hotels';
import { HotelService } from '../services/hotels/hotel.service';
import { MapService } from '../services/maps/map.service';
import * as L from 'leaflet';

@Pipe({
  name: 'hotelPipe',
  pure : false
})
export class HotelPipePipe implements PipeTransform {

  filterPrice(hotelList : HotelFacilitiesLists[], minPrice : number, maxPrice : number) {
    return hotelList.filter(res => res.Hotel.HotelPrice >= minPrice && res.Hotel.HotelPrice <= maxPrice)
  }

  filterLocation(hotelList : HotelFacilitiesLists[], hotelNameListByLocation : Hotels[], 
    filterHotelName : boolean[]) {
    var newList : HotelFacilitiesLists[] = Array(hotelList.length)
    var isFiltering : boolean = false;
    var idx : number = 0;
    for(let i = 0; i < hotelNameListByLocation.length ; i++) {
      if(filterHotelName[i] == true) {
        isFiltering = true;
        console.log("aaa")
        for(let j = 0 ; j < hotelList.length ; j++) {
          if(hotelList[j].Hotel.HotelName == hotelNameListByLocation[i].HotelName) {
            newList[idx++] = hotelList[j];
            console.log("sama")
          }
        }
      }
    }

    if(!isFiltering) {
      return hotelList;
    }

    return newList;
  }

   filterRate(hotelList : HotelFacilitiesLists[], filterRating : boolean[]) {
     var newList = Array(hotelList.length + 1);
     var isFiltering = false;
     var idx = 0;

     if(filterRating[0] == true) {
        isFiltering = true;
        for(let i = 0 ; i < hotelList.length ; i++) {
          if(hotelList[i].Hotel.HotelRating >= 1 && hotelList[i].Hotel.HotelRating <= 4) {
            newList[idx++] = hotelList[i];
          }
        }
     }
    if(filterRating[1] == true) {
      isFiltering = true;
      for(let i = 0 ; i < hotelList.length ; i++) {
        if(hotelList[i].Hotel.HotelRating >= 5 && hotelList[i].Hotel.HotelRating <= 7) {
          newList[idx++] = hotelList[i];
        }
      }
    }
    if(filterRating[2] == true) {
      isFiltering = true;
      for(let i = 0 ; i < hotelList.length ; i++) {
        if(hotelList[i].Hotel.HotelRating >= 8 && hotelList[i].Hotel.HotelRating <= 10) {
          newList[idx++] = hotelList[i];
        }
      }
    }
     if(!isFiltering){
       return hotelList;
     }
     return newList;
   } 

   filterByArea(hotelList : HotelFacilitiesLists[], hotelAreaByPlace : HotelAreas[], 
    filterHotelArea : boolean[]) {
      var newList : HotelFacilitiesLists[] = Array(hotelList.length)
    var isFiltering : boolean = false;
    var idx : number = 0;
    for(let i = 0; i < hotelAreaByPlace.length ; i++) {
      if(filterHotelArea[i] == true) {
        isFiltering = true;
        for(let j = 0 ; j < hotelList.length ; j++) {
          if(hotelList[j].Hotel.HotelArea.HotelAreaName == hotelAreaByPlace[i].HotelAreaName) {
            newList[idx++] = hotelList[j];
          }
        }
      }
    }

    if(!isFiltering) {
      return hotelList;
    }

    return newList;
    }

    filterByFacility(hotelList : HotelFacilitiesLists[], hotelFacilities : HotelFacilities[], filterHotelFacilities : boolean[]) {
      var newList : HotelFacilitiesLists[] = hotelList;
      for(let i = 0; i < hotelFacilities.length ; i++) {
        if(filterHotelFacilities[i] == true) {
          console.log(newList)
          if(newList.length == 0) return newList;
          hotelList = new Array(newList.length);
          var idx : number = 0;
          for(let j = 0 ; j < newList.length ; j++) {
            for(let k = 0 ; k < newList[j].HotelFacilityList.length ; k++) {
              if(newList[j].HotelFacilityList[k].HotelFacilityId == hotelFacilities[i].HotelFacilityId) {
                hotelList[idx++] = newList[j];
                break;
              }
            }
          }
          hotelList.length = idx;
          newList = hotelList;
        }
      }
      return newList;      
    }

  sortHotel(hotelList : HotelFacilitiesLists[], sortList : string[], filterSort : string) {

    if(filterSort == "Recommended") {
      hotelList.sort((a,b) => (a.Hotel.HotelLeft < b.Hotel.HotelLeft) ? -1 : 1)
    }
    else if(filterSort == "Price(lowest first)") {
      hotelList.sort((a,b) => (a.Hotel.HotelPrice < b.Hotel.HotelPrice) ? -1 : 1)
    }
    else if(filterSort == "Price(highest first)") {
      hotelList.sort((a,b) => (a.Hotel.HotelPrice > b.Hotel.HotelPrice) ? -1 : 1)
    }
    else if(filterSort == "Rating(highest first)") {
      hotelList.sort((a,b) => (a.Hotel.HotelRating > b.Hotel.HotelRating) ? -1 : 1)
    }
  }

  doFilterPriceBasedOn(hotelList : HotelFacilitiesLists[], filterPriceBasedOn : string) {
    if(filterPriceBasedOn == "") {
      return hotelList;
    }
    return hotelList.filter(res => res.Hotel.HotelPriceBasedOn == filterPriceBasedOn);
  }

  constructor(private hotelService : HotelService) {
    
  }

  transform(hotelList: HotelFacilitiesLists[], minPrice : number, maxPrice : number, 
    hotelNameListByLocation : Hotels[], filterHotelName : boolean[], filterRating : boolean[], 
    hotelAreaByPlace : HotelAreas[], filterHotelArea : boolean[]
  ,hotelFacilities : HotelFacilities[], filterHotelFacilities : boolean[],
  filterPriceBasedOn : string, sortList : string[], filterSort : string): any {

      // hotelList = this.filterPrice(hotelList,minPrice, maxPrice);

      // hotelList = this.filterLocation(hotelList,hotelNameListByLocation,filterHotelName);
      // hotelList = this.filterRate(hotelList,filterRating)
      // hotelList = this.filterByArea(hotelList, hotelAreaByPlace, filterHotelArea)
      // hotelList = this.filterByFacility(hotelList, hotelFacilities, filterHotelFacilities)
      // hotelList = this.doFilterPriceBasedOn(hotelList,filterPriceBasedOn);
      // for(let i = 0 ; i < hotelList.length ; i++) {
      //   if(hotelList[i] == undefined) {
      //     hotelList.length = i;
      //     break;
      //   }
      // }

      // this.sortHotel(hotelList,sortList, filterSort);

      // this.hotelService.filter()
      
  }

}
