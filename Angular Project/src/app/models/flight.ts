import { Time } from '@angular/common';

export class Flight {
    FlightId : number;
    FlightName : String;
    FlightImage : ImageBitmap;
}

export class FlightSchedule {
    FlightTimeFrom : Time;
    FlightTimeTo : Time;
}