export class HotelCategories {
    HotelCategoryId :number 
	HotelCategoryName :string
}

export class HotelPlaces {
    HotelPlaceId : number 
	HotelPlaceName : string
}

export class HotelAreas {
    HotelAreaId : number 
	HotelPlace : HotelPlaces 
	HotelAreaName : string
}

export class HotelFacilities {
    HotelFacilityId : number
	HotelFacilityName : string
	HotelFacilityPicture : string
}

export class HotelFacilitiesLists {
    // HotelFacilityListId : number
    HotelFacility : HotelFacilities
    HotelFacilityId : number 
    HotelFacilityList : HotelFacilities[]
    Hotel : Hotels
    HotelId : number
}


export class Hotels {
    HotelId : number
	HotelName : string
	HotelPicture : string
	HotelCategory : HotelCategories 
	HotelRating : number
	HotelPrice : number
	HotelDiscountPrice : number
	HotelPriceBasedOn : string
	HotelLeft : number
	HotelArea : HotelAreas 
	HotelLocationLatitude : number
	HotelLocationLongitude : number
	HotelInformation : string
	HotelAddress : string
}