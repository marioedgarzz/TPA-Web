import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviBarComponent } from './components/navi-bar/navi-bar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuickCardComponent } from './components/quick-card/quick-card.component';
import { HotelQuickComponent } from './hotel/hotel-quick/hotel-quick.component';
import { FlightQuickComponent } from './flight/flight-quick/flight-quick.component';
import { CarRentalQuickComponent } from './car-rental/car-rental-quick/car-rental-quick.component';
import { TrainQuickComponent } from './trains/train-quick/train-quick.component';
import { EventQuickComponent } from './events/event-quick/event-quick.component';
import { LoginDialogComponent } from './dialogs/login-dialog/login-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { RegisterDialogComponent } from './dialogs/register-dialog/register-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { MatExpansionModule } from '@angular/material/expansion';
import { GoogleSignInComponent } from './dialogs/google-sign-in/google-sign-in.component';
import { FacebookSignInComponent } from './dialogs/facebook-sign-in/facebook-sign-in.component';
import { FlightHeaderComponent } from './flight/flight-header/flight-header.component';
import { TrainHeaderComponent } from './trains/train-header/train-header.component';
import { OverlayComponentComponent } from './utilities/overlay-component/overlay-component.component';
import { CarRentalHeaderComponent } from './car-rental/car-rental-header/car-rental-header.component';
import { HotelHeaderComponent } from './hotel/hotel-header/hotel-header.component';
import {MatSliderModule} from '@angular/material/slider';
import { TransparentOverlayComponent } from './utilities/transparent-overlay/transparent-overlay.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { ManageAccountComponent } from './account/manage-account/manage-account.component'
import { MatInputModule } from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';
import { SettingsAccountComponent } from './account/settings-account/settings-account.component';
import { CarDetailComponent } from './car-rental/car-detail/car-detail.component';
import { CarPipePipe } from './pipes/car-pipe.pipe';
import { TrainPipePipe } from './pipes/train-pipe.pipe';
import { ManageTrainComponent } from './admin-page/manage-train/manage-train.component';
import { ManageTrainUpdateComponent } from './admin-page/manage-train-update/manage-train-update.component';
import { ManageTrainDeleteComponent } from './admin-page/manage-train-delete/manage-train-delete.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { LoginAdminComponent } from './admin-page/login-admin/login-admin.component';
import { HeaderAdminComponent } from './admin-page/header-admin/header-admin.component';
import { ManageBlogComponent } from './admin-page/manage-blog/manage-blog.component';
import { ManageEventComponent } from './admin-page/event/manage-event/manage-event.component';
import { ManageHotelComponent } from './admin-page/manage-hotel/manage-hotel.component';
import { ManageFlightComponent } from './admin-page/manage-flight/manage-flight.component';
import { ManageTrainFilterPipe } from './pipes/manage-train-filter.pipe';
import { HotelPipePipe } from './pipes/hotel-pipe.pipe';
import { HotelHeaderMapComponent } from './hotel/hotel-header-map/hotel-header-map.component';
import { MapService } from './services/maps/map.service';
import { PopUpService } from './services/maps/pop-up.service';
import { HotelDetailComponent } from './hotel/hotel-detail/hotel-detail.component';
import { ManageHotelPipe } from './pipes/manage-hotel.pipe';
import { ManageHotelDeleteComponent } from './admin-page/manage-hotel-delete/manage-hotel-delete.component';
import { ManageHotelUpdateComponent } from './admin-page/manage-hotel-update/manage-hotel-update.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { PromoPageComponent } from './pages/promo-page/promo-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { EventHeaderComponent } from './events/event-header/event-header.component';
import { EventSearchComponent } from './events/event-search/event-search.component';
import * as $ from 'jquery';
import { EventSearchPipe } from './pipes/event-search.pipe';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventOrderComponent } from './events/event-order/event-order.component';
import { ManageEventPipe } from './pipes/manage-event.pipe';
import { ManageEventUpdateComponent } from './admin-page/event/manage-event-update/manage-event-update.component';
import { ManageEventDeleteComponent } from './admin-page/event/manage-event-delete/manage-event-delete.component';
import { ManageBlogUpdateComponent } from './admin-page/manage-blog-update/manage-blog-update.component';
import { ManageBlogDeleteComponent } from './admin-page/manage-blog-delete/manage-blog-delete.component';
import { ManageBlogPipe } from './pipes/manage-blog.pipe';
import { ChatHeaderComponent } from './pages/chat-header/chat-header.component';
import { ChatDetailComponent } from './pages/chat-detail/chat-detail.component';
import { ChatPipePipe } from './pipes/chat-pipe.pipe';

import { CommonModule } from '@angular/common';
// import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlightCalendarComponent } from './flight/flight-calendar/flight-calendar.component';
import { ZoomPageComponent } from './pages/zoom-page/zoom-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviBarComponent,
    HomePageComponent,
    FooterComponent,
    QuickCardComponent,
    HotelQuickComponent,
    FlightQuickComponent,
    CarRentalQuickComponent,
    TrainQuickComponent,
    EventQuickComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    GoogleSignInComponent,
    FacebookSignInComponent,
    FlightHeaderComponent,
    TrainHeaderComponent,
    OverlayComponentComponent,
    CarRentalHeaderComponent,
    HotelHeaderComponent,
    TransparentOverlayComponent,
    AccountPageComponent,
    ManageAccountComponent,
    SettingsAccountComponent,
    CarDetailComponent,
    CarPipePipe,
    TrainPipePipe,
    ManageTrainComponent,
    ManageTrainUpdateComponent,
    ManageTrainDeleteComponent,
    ChatPageComponent,
    LoginAdminComponent,
    HeaderAdminComponent,
    ManageBlogComponent,
    ManageEventComponent,
    ManageHotelComponent,
    ManageFlightComponent,
    ManageTrainFilterPipe,
    HotelPipePipe,
    HotelHeaderMapComponent,
    HotelDetailComponent,
    ManageHotelPipe,
    ManageHotelDeleteComponent,
    ManageHotelUpdateComponent,
    BlogPageComponent,
    BlogDetailComponent,
    PromoPageComponent,
    CheckoutPageComponent,
    EventHeaderComponent,
    EventSearchComponent,
    EventSearchPipe,
    EventDetailComponent,
    EventOrderComponent,
    ManageEventPipe,
    ManageEventUpdateComponent,
    ManageEventDeleteComponent,
    ManageBlogUpdateComponent,
    ManageBlogDeleteComponent,
    ManageBlogPipe,
    ChatHeaderComponent,
    ChatDetailComponent,
    ChatPipePipe,
    FlightCalendarComponent,
    ZoomPageComponent,
    OrderPageComponent
  ],
  entryComponents: [
    LoginDialogComponent,
    RegisterDialogComponent,
    ManageTrainUpdateComponent,
    ManageTrainDeleteComponent,
    ManageHotelDeleteComponent,
    ManageHotelUpdateComponent,
    ManageEventDeleteComponent,
    ManageEventUpdateComponent,
    ManageBlogUpdateComponent,
    ManageBlogDeleteComponent,
    ZoomPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MatExpansionModule,
    MatSliderModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,

    CommonModule,
    FormsModule,
    // FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    MapService,
    PopUpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    apollo : Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link : httpLink.create({uri: 'http://localhost:4100/api'}),
      cache: new InMemoryCache()
    })
  }
}
