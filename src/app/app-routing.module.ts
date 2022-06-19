import { InvoiceComponent } from './invoice/invoice.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaptopFormComponent } from './laptop-all/laptop-form/laptop-form.component';
import { LaptopComponent } from './laptop-all/laptop/laptop.component';
import { ViewDetailComponent } from './laptop-all/view-detail/view-detail.component';
import { FeedbackComponent } from './customer-service/feedback/feedback.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TremConditionComponent } from './trem-condition/trem-condition.component';
import { AuthGuardService } from './service/auth-gurd.service';
import { DesktopFormComponent } from './desktop-all/desktop-form/desktop-form.component';
import { DesktopAllComponent } from './desktop-all/desktop-all.component';
import { MonitorFormComponent } from './monitor/monitor-form/monitor-form.component';
import { MonitorAllComponent } from './monitor/monitor-all/monitor-all.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component: HomeComponent},
  {path:'laptop_from',component:LaptopFormComponent},
  {path:'laptop',component:LaptopComponent},
  {path:'detail',component:ViewDetailComponent},
  {path:'laptop/:brand_id',component:LaptopFormComponent},
  {path:'signin',component:SignInFormComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'term',component:TremConditionComponent},
  {path:'feedback',component:FeedbackComponent},
  {path:'contact-us',component:CustomerServiceComponent},
  {path:'manage',component:ManageAdminComponent,canActivate:[AuthGuardService]},
  {path:'add-to-card',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'desktop_form',component:DesktopFormComponent},
  {path:'desktop',component:DesktopAllComponent},
  {path:'monitor_form',component:MonitorFormComponent},
  {path:'monitor',component:MonitorAllComponent},
  {path:'invoice',component:InvoiceComponent},
  {path:'edit/:id',component:LaptopFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
