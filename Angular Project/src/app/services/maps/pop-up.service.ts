import { Injectable } from '@angular/core';
import { HotelFacilitiesLists } from 'src/app/models/hotels';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  makeCapitalPopup(data : HotelFacilitiesLists) : string {
    return '<div> <img src="' + data.Hotel.HotelPicture + '" style="width:50px"></div>' +  
      '<div> Hotel Name :'+ data.Hotel.HotelName + '</div>' + 
      '<div> Hotel Area : ' + data.Hotel.HotelArea.HotelAreaName + '</div>' + 
      '<div> Hotel Price : ' + data.Hotel.HotelPrice + '</div>' + 
      '<div> Hotel Left : ' + data.Hotel.HotelLeft + ' left </div>' +
      '<div> <button> <a href="/hotel-header/' + data.Hotel.HotelId + '"> Order Now </a> </button> </div>'; 
  }
}
