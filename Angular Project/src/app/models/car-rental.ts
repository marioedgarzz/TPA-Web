export class CarTransfer {
    CarRentalPlace: string;
    CarStartDate: string;
    CarEndDate : string;
    CarQuantity : number;
}

export class CarBrands {
    CarBrandId : number;
    CarBrandName : string;
}

export class CarVendors {
    CarVendorId : number;
    CarVendorName : string;
    CarVendorPicture : string;
}

export class CarModels {
    CarModelId : number;
    CarModelName : string;
}

export class Cars {
    CarId : number;
    CarBrand : CarBrands;
    CarModel : CarModels;
    CarPassengerCapacity : number;
    CarBaggageCapacity : number
}

export class CarFromVendors {
    CarFromVendorId : number;
    CarVendor : CarVendors;
    CarPrice : number;
    Car : Cars;
}