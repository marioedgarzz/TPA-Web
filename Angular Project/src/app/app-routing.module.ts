import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginDialogComponent } from './dialogs/login-dialog/login-dialog.component';
import { TrainHeaderComponent } from './trains/train-header/train-header.component';
import { QuickCardComponent } from './components/quick-card/quick-card.component';
import { CarRentalHeaderComponent } from './car-rental/car-rental-header/car-rental-header.component';
import { HotelHeaderComponent } from './hotel/hotel-header/hotel-header.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { CarDetailComponent } from './car-rental/car-detail/car-detail.component';
import { ManageTrainComponent } from './admin-page/manage-train/manage-train.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { LoginAdminComponent } from './admin-page/login-admin/login-admin.component';
import { ManageBlogComponent } from './admin-page/manage-blog/manage-blog.component';
import { ManageFlightComponent } from './admin-page/manage-flight/manage-flight.component';
import { ManageEventComponent } from './admin-page/manage-event/manage-event.component';
import { ManageHotelComponent } from './admin-page/manage-hotel/manage-hotel.component';
import { HotelHeaderMapComponent } from './hotel/hotel-header-map/hotel-header-map.component';
import { HotelDetailComponent } from './hotel/hotel-detail/hotel-detail.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { PromoPageComponent } from './pages/promo-page/promo-page.component';
import { EventSearchComponent } from './events/event-search/event-search.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventOrderComponent } from './events/event-order/event-order.component';

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "login",
    component: LoginDialogComponent
  },
  {
    path: "flight",
    component: QuickCardComponent
  },
  {
    path: "car-rental",
    component: QuickCardComponent
  },
  {
    path: "train",
    component: QuickCardComponent
  },
  {
    path : "event",
    component : QuickCardComponent
  },
  {
    path: "hotel",
    component : QuickCardComponent
  },
  {
    path: "train-header",
    component: TrainHeaderComponent
  },
  {
    path: "car-rental-header",
    component: CarRentalHeaderComponent
  },
  {
    path: "hotel-header",
    component: HotelHeaderComponent
  },
  {
    path : "hotel-header-map",
    component : HotelHeaderMapComponent
  },
  {
    path: "profile",
    component: AccountPageComponent
  },
  {
    path: "car-detail",
    component : CarDetailComponent
  },
  {
    path: "manage-train",
    component : ManageTrainComponent
  },
  {
    path: "manage-blog",
    component : ManageBlogComponent
  },
  {
    path: "manage-flight",
    component : ManageFlightComponent
  },
  {
    path: "manage-event",
    component : ManageEventComponent
  },
  {
    path: "manage-hotel",
    component : ManageHotelComponent
  },
  {
    path: "chat-page",
    component : ChatPageComponent
  },
  {
    path: "admin-page",
    component : LoginAdminComponent
  },
  {
    path:"hotel-header/:id",
    component : HotelDetailComponent
  },
  {
    path:"blog/:id",
    component : BlogDetailComponent
  },
  {
    path: "blog",
    component : BlogPageComponent
  },
  {
    path: "promo/:id",
    component : PromoPageComponent
  },
  {
    path: "event-search",
    component : EventSearchComponent
  },
  {
    path :"event-detail/:id",
    component : EventDetailComponent
  },
  {
    path : "event-order/:id",
    component : EventOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
