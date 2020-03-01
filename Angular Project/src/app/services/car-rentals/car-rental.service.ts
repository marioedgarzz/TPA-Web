import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CarFromVendors, CarVendors, CarBrands, CarModels } from 'src/app/models/car-rental';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarRentalService {

  constructor(private apollo : Apollo) { }

  getAllCars() : Observable<CarFromVendors[]>{
    return this.apollo.watchQuery<any>({
      query : gql `
        query getAllCars{
          getAllCars {
            CarPrice
            CarFromVendorId
            Car {
              CarId
              CarPicture
              CarBrand {
                CarBrandName
              }
              CarModel {
                CarModelName
              }
              CarPassengerCapacity
              CarBaggageCapacity
            }
          }
        }
      `,
      }
    ).valueChanges
    .pipe(
      map(result => result.data.getAllCars)
    )

    /*
      CarVendor {
        CarVendorId
        CarVendorName
        CarVendorPicture
      }
    */
  }

  getCarByRentalPlace(carRentalPlace : string) : Observable<CarFromVendors[]> {
    return this.apollo.watchQuery<any>({
      query : gql `
        query getCarByRentalPlace($carRentalPlace : String){
          getCarByRentalPlace(CarRentalPlace : $carRentalPlace) {
            Car {
              CarBaggageCapacity
              CarId
              CarPassengerCapacity
              CarPicture
              CarBrand {
                CarBrandId
                CarBrandName
              }
              CarModel {
                CarModelId
                CarModelName
              }
            }
            CarPrice
            CarFromVendorId
            CarRentalPlaces {
              CarRentalPlaceId
              CarRentalPlaceName
            }
            CarVendor {
              CarVendorId
              CarVendorName
              CarVendorPicture
            }
          }
        }
      `,
      variables : {
        "carRentalPlace" : carRentalPlace
      }
      
    }).valueChanges.
      pipe(
        map(result => result.data.getCarByRentalPlace)
      )
  }

  public static getCurrentDetail() : number {
    var str: string = sessionStorage.getItem("CarDetail")

    if(str == undefined || str == "") {
      return 0;
    }
    return parseInt(str);
  }

  public static setCurrentDetail(a : number) {
    sessionStorage.setItem("CarDetail",a + "");
  }

  getCarByFromVendorId(id : number) : Observable<CarFromVendors[]>{
    return this.apollo.watchQuery<any>({
      query : gql `
        query getCarByFromVendorId ($id : Int){
          getCarByFromVendorId(CarFromVendorId :$id){
            CarFromVendorId
            Car {
              CarId
              CarBaggageCapacity
              CarPassengerCapacity
              CarPicture
              CarBrand {
                CarBrandName
              }
              CarModel {
                CarModelName
              }
            }
            CarPrice
            CarVendor {
              CarVendorId
              CarVendorName
              CarVendorPicture
            }
          }
        }
      `,
      variables : {
        "id" : id
      }
    }).valueChanges
    .pipe(
      map(result => result.data.getCarByFromVendorId)
    )
  }

  getAllCarBrands() :Observable<CarBrands[]>{
    return this.apollo.watchQuery<any>({
      query: gql `
        query getAllCarBrands {
          getAllCarBrands{
            CarBrandName
          }
        }
      `
    }).valueChanges.pipe(
      map(result => result.data.getAllCarBrands)
    )
  }

  getAllCarModels() :Observable<CarModels[]>{
    return this.apollo.watchQuery<any>({
      query: gql `
        query getAllCarModels {
          getAllCarModels{
            CarModelName
          }
        }
      `
    }).valueChanges.pipe(
      map(result => result.data.getAllCarModels)
    )
  }
}
