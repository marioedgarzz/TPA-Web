import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';
import { HotelService } from '../hotels/hotel.service';
import { HotelFacilitiesLists } from 'src/app/models/hotels';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http : HttpClient,
    private popUpService : PopUpService,
    private hotelService : HotelService) { }

  makeCapitalMarkers(hotelFacilitiesList : HotelFacilitiesLists[], map: L.map) : void {
    this.assign(hotelFacilitiesList, map);
  }

  isUpdating = false;

  assign(result : HotelFacilitiesLists[], map : L.map) {

    for(let i = 0 ; i < result.length ; i++) {
      const latitude = result[i].Hotel.HotelLocationLatitude;
      const longitude = result[i].Hotel.HotelLocationLongitude;      
      const circle = L.circleMarker([longitude,latitude], {
        radius : 1
      })

      circle.bindPopup(this.popUpService.makeCapitalPopup(result[i]))

      circle.addTo(map)
      
      console.log("aaa")
    }

  }

  static ScaledRadius(val: number, maxVal : number) : number {
    return 20 * (val/maxVal);
  }


}
