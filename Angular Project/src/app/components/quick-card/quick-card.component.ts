import { Component, OnInit } from '@angular/core';
import { OverlayComponentComponent } from 'src/app/utilities/overlay-component/overlay-component.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-card',
  templateUrl: './quick-card.component.html',
  styleUrls: ['./quick-card.component.scss']
})
export class QuickCardComponent implements OnInit {

  constructor(private router : Router) { }

  onFocus : boolean = false;
  quickCardShow: boolean[] = [
    false,false,false,false,false
  ];
  showAllAvailables : boolean
  ngOnInit() {
    this.showAllAvailables = false;
    if(this.router.url == "/"){
      this.quickCardShow[0] = true;
      this.showAllAvailables = true;
    }
    else if(this.router.url.startsWith("/flight"))
      this.quickCardShow[0] = true;
    else if(this.router.url.startsWith("/hotel"))
      this.quickCardShow[1] = true;
    else if(this.router.url.startsWith("/train"))
      this.quickCardShow[2] = true;
    else if(this.router.url.startsWith("/car-rental"))
      this.quickCardShow[3] = true;  
    else if(this.router.url.startsWith("/event"))
      this.quickCardShow[4] = true;
  }

  changeQuickCard(changeNumber: number) {
    for(let i = 0 ; i < 5 ; i++) {
      this.quickCardShow[i] = false;
    }
    this.quickCardShow[changeNumber-1] = true;
  }

  getFocus() {
    this.onFocus = true;
  }

  getClicked() {
    this.onFocus = !this.onFocus;
  }

}
