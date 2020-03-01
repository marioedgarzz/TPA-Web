export class Train {
    TrainId : number;
    TrainName : string;
    TrainBasePrice : number;
}

export class TrainClass { //economy business executive
    TrainClassId : number;
    TrainClassName : string;
    TrainSubclassName : string;
    TrainClassAdultPrice : number;
    TrainClassInfantPrice : number;
}

export class TrainPlace {
    TrainPlaceId : number;
    TrainPlaceName : string;
}

export class TrainSchedule {
    TrainScheduleId : number;
    Train : Train;
    TrainClass : TrainClass;
    TrainPlaceFrom : TrainPlace;
    TrainPlaceTo : TrainPlace;
    TrainDate: string;
    TrainTimeFrom : string;
    TrainTimeTo : string;
}