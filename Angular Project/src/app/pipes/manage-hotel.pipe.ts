import { Pipe, PipeTransform } from '@angular/core';
import { HotelFacilitiesLists, HotelCategories } from '../models/hotels';

@Pipe({
  name: 'manageHotel'
})
export class ManageHotelPipe implements PipeTransform {

  transform(value: HotelFacilitiesLists[], filter : string): any {
    if(filter == "All") return value;
    return value.filter(res => res.Hotel.HotelCategory.HotelCategoryName == filter);
  }

}
