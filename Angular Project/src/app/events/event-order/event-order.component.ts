import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events/events.service';
import { Events } from 'src/app/models/events';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { GraphqlUsersService } from 'src/app/services/graphql-users.service';
import { Users } from 'src/app/models/types';

@Component({
  selector: 'app-event-order',
  templateUrl: './event-order.component.html',
  styleUrls: ['./event-order.component.scss']
})
export class EventOrderComponent implements OnInit {

  constructor(private act : ActivatedRoute,
    private eventService : EventsService,
    private userService : GraphqlUsersService) { }

  private id : number;
  private currEvent : Events;
  private dateTransfer : string;
  private isShowDetail : boolean = false;

  private slctTitle : string;
  private firstName : string;
  private lastName : string;
  private phoneNumber : string;
  private email : string;

  private slctTitle2 : string;
  private firstName2 : string;
  private lastName2 : string;
  private phoneNumber2 : string;
  private email2 : string;

  private showLoading : boolean = false;
  private currUser : Users;

  makeSame() {
    this.slctTitle2 = this.slctTitle;
    this.firstName2 = this.firstName;
    this.lastName2 = this.lastName;
    this.phoneNumber2 = this.phoneNumber;
    this.email2 = this.email;
  }

  ngOnInit() {
    this.id =+ this.act.snapshot.paramMap.get("id")  
    this.dateTransfer = EventsService.getDateTransfer();
    this.eventService.getAllEvents().subscribe(
      async result => {
        await (this.assign(result))
      }
    )

    let userId = UserStorageService.getCurrentUserId()

    if(userId != 0) {
      this.userService.getUserById(userId).subscribe(
        async result => {
          await this.assignUser(result[0]);
        }
      )
    }
  }

  assignUser(user : Users) {
    this.slctTitle = user.UserTitle;
    var username : string[]= user.Username.split(" ")
    this.firstName = username[0];
    this.lastName = username[1];
    this.phoneNumber = user.UserPhoneNumber;
    this.email = user.UserEmail;
  }
  
  toPayment() {
    this.showLoading = true;
  }

  showDetail() {
    this.isShowDetail = !this.isShowDetail;
  }

  assign(result : Events[]) {
    result.forEach(element => {
      if(element.EventId == this.id) {
        this.currEvent = element;
      }
    });
  }

}
