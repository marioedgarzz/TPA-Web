import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { Hotels, HotelAreas, HotelFacilities, HotelFacilitiesLists, HotelCategories } from 'src/app/models/hotels';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private apollo : Apollo) { }

  getAllHotels() : Observable<HotelFacilitiesLists[]> {
    return this.apollo.watchQuery<any>({
      query : gql `
      query getAllHotels {
        getAllHotels {
          Hotel {
            HotelDiscountPrice
            HotelId
            HotelLeft
            HotelLocationLatitude
            HotelLocationLongitude
            HotelName
            HotelPicture
            HotelPrice
            HotelPriceBasedOn
            HotelRating
            HotelInformation
            HotelArea {
              HotelAreaId
              HotelAreaName
              HotelPlace {
                HotelPlaceId
                HotelPlaceName
              }
            }
            HotelCategory {
              HotelCategoryId
              HotelCategoryName
            }
            HotelAddress
          }
          HotelFacility {
            HotelFacilityId
            HotelFacilityName
            HotelFacilityPicture
          }
        }
      }
      `
    }).valueChanges.pipe(
      map(result => result.data.getAllHotels)
    )
  }

  getAllHotelsByPlaceName(PlaceName : string) : Observable<HotelFacilitiesLists[]> {
    return this.apollo.watchQuery<any>({
      query : gql`
      query getAllHotelsByPlaceName($placeName : String) {
        getAllHotelsByPlaceName(PlaceName : $placeName){
          Hotel {
            HotelDiscountPrice
            HotelId
            HotelLeft
            HotelLocationLatitude
            HotelLocationLongitude
            HotelName
            HotelPicture
            HotelPrice
            HotelPriceBasedOn
            HotelRating
            HotelInformation
            HotelArea {
              HotelAreaId
              HotelAreaName
            }
            HotelCategory {
              HotelCategoryId
              HotelCategoryName
            }
            HotelAddress
          }
          HotelFacility {
            HotelFacilityId
            HotelFacilityName
            HotelFacilityPicture
          }
        }
      }
      `,
      variables : {
        "placeName" : PlaceName
      }
    }).valueChanges.pipe(
      map(result => result.data.getAllHotelsByPlaceName)
    )
  }

  getAllArea() : Observable<HotelAreas[]> {
    return this.apollo.watchQuery<any>({
      query : gql `
      query getAllHotelAreas{
        getAllHotelAreas{
          HotelAreaName
        }
      }   
      `
    }).valueChanges.pipe(
      map(result => result.data.getAllHotelAreas)
    )
  }

  getAllAreasByPlaceName(PlaceName : string) : Observable<HotelAreas[]>{
    return this.apollo.watchQuery<any>({
      query : gql `
        query getAllAreasByPlaceName ($placeName : String){
          getAllAreasByPlaceName(PlaceName : $placeName) {
            HotelAreaName
            HotelAreaId
            HotelPlace {
              HotelPlaceId
              HotelPlaceName
            }
          }
        }
      `,
      variables : {
        "placeName" : PlaceName
      }
    }).valueChanges.pipe(
      map(result => result.data.getAllAreasByPlaceName)
    )
  }

  getAllHotelByLocation(location : string) : Observable<Hotels[]> {
    return this.apollo.watchQuery<any>({
      query : gql `
        query getHotelByLocation($placeName : String){
          getHotelByLocation (HotelPlace : $placeName){
            HotelDiscountPrice
            HotelId
            HotelLeft
            HotelLocationLatitude
            HotelLocationLongitude
            HotelName
            HotelPicture
            HotelPrice
            HotelPriceBasedOn
            HotelRating
            HotelInformation
            HotelAddress
          }
        }
      `,
      variables : {
        "placeName" : location
      }
    }).valueChanges.pipe(
      map(result => result.data.getHotelByLocation)
    )
  }

  getAllFacilities() : Observable<HotelFacilities[]> {
    return this.apollo.watchQuery<any>({
      query : gql `
        query getAllFacilities {
          getAllFacilities {
            HotelFacilityId
            HotelFacilityName
            HotelFacilityPicture
          }
        }
      `,
    }).valueChanges.pipe(
      map(result => result.data.getAllFacilities)
    )
  }

  insertNewHotel(HotelName : string, HotelPicture : string, HotelLocation : string, HotelRating : number,
    HotelAddress : string, HotelFacilities : number[], HotelCategoryName : string, HotelInformation : string) :
    Observable<any>{
      return this.apollo.mutate<any>({
        mutation : gql`
          mutation insertNewHotel($HotelName : String, $HotelPicture : String, $HotelLocation : String, $HotelRating : Float,
            $HotelAddress : String, $HotelFacilities : [Int], $HotelCategoryName : String, $HotelInformation : String){
            insertNewHotel(HotelName : $HotelName, HotelPicture : $HotelPicture, HotelLocation : $HotelLocation, HotelRating : $HotelRating,
            HotelAddress : $HotelAddress, HotelFacilitiesId : $HotelFacilities, HotelCategoryName : $HotelCategoryName, HotelInformation : $HotelInformation) {
              HotelLeft
            }
          }`,
        variables : {
          "HotelAddress": HotelAddress,
          "HotelFacilities": HotelFacilities,
          "HotelInformation": HotelInformation,
          "HotelLocation": HotelLocation,
          "HotelName": HotelName,
          "HotelPicture": HotelPicture,
          "HotelRating": HotelRating,
          "HotelCategoryName": HotelCategoryName
        }
      })
    }

    updateHotel(HotelId : number,HotelName : string, HotelPicture : string, HotelLocation : string, HotelRating : number,
      HotelAddress : string, HotelFacilities : number[], HotelCategoryName : string, HotelInformation : string) : Observable<any> {
        return this.apollo.mutate({
          mutation : gql `
          mutation updateHotel($hotelId : Int, $HotelName : String, $HotelPicture : String, $HotelLocation : String, $HotelRating : Float,
            $HotelAddress : String, $HotelFacilities : [Int], $HotelCategoryName : String, $HotelInformation : String){
            updateHotel(HotelId : $hotelId, HotelName : $HotelName, HotelPicture : $HotelPicture, HotelLocation : $HotelLocation, HotelRating : $HotelRating,
            HotelAddress : $HotelAddress, HotelFacilitiesId : $HotelFacilities, HotelCategoryName: $HotelCategoryName, HotelInformation : $HotelInformation) {
              HotelLeft
            }
          }
          `,
          variables : {
            "HotelId" : HotelId,
            "HotelAddress": HotelAddress,
            "HotelFacilities": HotelFacilities,
            "HotelInformation": HotelInformation,
            "HotelLocation": HotelLocation,
            "HotelName": HotelName,
            "HotelPicture": HotelPicture,
            "HotelRating": HotelRating,
            "HotelCategoryName": HotelCategoryName
          }
        })
    }

    deleteHotel(hotelId : number) : Observable<any> {
      return this.apollo.mutate<any>({
        mutation : gql `
          mutation deleteHotel($hotelId : Int){
            deleteHotel(HotelId : $hotelId){
              HotelId
            }
          }`,
        variables : {
          "hotelId": hotelId
        }
      })
    }

    getAllHotelCategories() : Observable<HotelCategories[]> {
      return this.apollo.watchQuery<any>({
        query : gql`
          query getAllHotelCategories {
            getAllHotelCategories {
              HotelCategoryName
            }
          }
        `
      }).valueChanges.pipe(
        map(result => result.data.getAllHotelCategories)
      )
    }
  
}
