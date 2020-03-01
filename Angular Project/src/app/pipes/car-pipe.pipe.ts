import { Pipe, PipeTransform } from '@angular/core';
import { CarFromVendors, CarModels, CarBrands } from '../models/car-rental';

@Pipe({
  name: 'carPipe', pure : false
})
export class CarPipePipe implements PipeTransform {

  filterPrice(value : CarFromVendors[],minPrice : number, maxPrice : number) {
    return value.filter(result => result.CarPrice >= minPrice && result.CarPrice <= maxPrice);
  }

  filterByPassenger(value : CarFromVendors[],filter : boolean[]) {
    if(filter[0] == true) {
      return value.filter(result => result.Car.CarPassengerCapacity < 5)
    }
    else if(filter[1] == true) {
      return value.filter(result => (result.Car.CarPassengerCapacity >= 5 && result.Car.CarPassengerCapacity <= 6))
    }
    else if(filter[2] == true) {
      return value.filter(result => (result.Car.CarPassengerCapacity > 6))
    }
    else {
      return value;
    }
  }

  filterByCarModel(value : CarFromVendors[], carModels : CarModels[], filter : boolean[]) {
    var newCar : CarFromVendors[] = Array(carModels.length);
    let idx = 0;
    var isFiltering : boolean = false;
    for(let i = 0 ; i < filter.length ; i++) {
      if(filter[i] == true) {
        isFiltering = true;
        value.forEach(element => {
          if(element.Car.CarModel.CarModelName == carModels[i].CarModelName) {
            newCar[idx++] = element;
          }
        });
      }
    }

    if(!isFiltering) {
      return value;
    }
    return newCar;
  }

  filterByCarBrand(value : CarFromVendors[],carBrands : CarBrands[], filter : boolean[]) {
    var newCar : CarFromVendors[] = Array(carBrands.length);
    let idx = 0;
    var isFiltering : boolean = false;
    for(let i = 0 ; i < filter.length ; i++) {
      if(filter[i] == true) {
        isFiltering = true;
        value.forEach(element => {
          if(element.Car.CarBrand.CarBrandName == carBrands[i].CarBrandName) {
            newCar[idx++] = element;
          }
        });
      }
    }

    if(!isFiltering) {
      return value;
    }
    return newCar;
  }

  transform(value: CarFromVendors[], isFilterPassenger :boolean[], filterCarModel: CarModels[] ,
    isFilterCarModel : boolean[], filterCarBrand : CarBrands[], isFilterCarBrand : boolean[],
    minPrice : number, maxPrice : number): CarFromVendors[] {
    value = this.filterPrice(value,minPrice,maxPrice);
    value = this.filterByPassenger(value,isFilterPassenger);
    value = this.filterByCarBrand(value,filterCarBrand,isFilterCarBrand);
    value = this.filterByCarModel(value,filterCarModel,isFilterCarModel);
    
    var newVal : CarFromVendors[] = Array(1000);

    let idx = 0;
    value.forEach(element => {
      if(element != undefined) {
        newVal[idx++] = element;
      }
    });

    newVal.length = idx;

    return newVal;
  }

}
