import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-quick',
  templateUrl: './flight-quick.component.html',
  styleUrls: ['./flight-quick.component.scss']
})
export class FlightQuickComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  redirect() {
    this.router.navigate(["/flight-header"])
  }

}
