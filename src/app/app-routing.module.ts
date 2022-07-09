import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { MousesComponent } from './accessories/mouse/mouses/mouses.component';
import { GamingComponent } from './gaming/gaming.component';
import { PrinterComponent } from './printer/printer.component';
import { InvoiceComponent } from './invoice/invoice.component';
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
import { PrinterFormComponent } from './printer/printer-form/printer-form.component';
import { GamingFormComponent } from './gaming/gaming-form/gaming-form.component';
import { MouseComponent } from './accessories/mouse/mouse.component';
import { KeyboardComponent } from './accessories/keyboard/keyboard.component';
import { PenComponent } from './accessories/pen/pen.component';
import { BagComponent } from './accessories/bag/bag.component';
import { AudioComponent } from './accessories/audio/audio.component';
import { KeyboardsComponent } from './accessories/keyboard/keyboards/keyboards.component';
import { PensComponent } from './accessories/pen/pens/pens.component';
import { BagsComponent } from './accessories/bag/bags/bags.component';
import { AudiosComponent } from './accessories/audio/audios/audios.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component: HomeComponent},
  {path:'laptop_from',component:LaptopFormComponent},
  {path:'laptop',component:LaptopComponent},
  {path:'detail',component:ViewDetailComponent},
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
  {path:'mouse',component:MousesComponent},
  {path:'keyboard',component:KeyboardsComponent},
  {path:'pen',component:PensComponent},
  {path:'bag',component:BagsComponent},
  {path:'audio',component:AudiosComponent},
  {path:'sign-in',component:SignInFormComponent},
  
  


  {path:'laptop/:id',component:LaptopFormComponent},
  {path:'desktop/:id',component:DesktopFormComponent},
  {path:'monitor/:id',component:MonitorFormComponent},
  {path:'printer/:id',component:PrinterFormComponent},
  {path:'gaming/:id',component:GamingFormComponent},
  {path:'keyboard/:id',component:KeyboardComponent},
  {path:'mouse/:id',component:MouseComponent},
  {path:'pen/:id',component:PenComponent},
  {path:'bag/:id',component:BagComponent},
  {path:'audio/:id',component:AudioComponent},


  {path:'printer_form',component:PrinterFormComponent},
  {path:'printer',component:PrinterComponent},
  {path:'gaming_from',component:GamingFormComponent},
  {path:'gaming',component:GamingComponent},
  {path:'mouse_from',component:MouseComponent},
  {path:'keyboard_from',component:KeyboardComponent},
  {path:'pen_from',component:PenComponent},
  {path:'bag_from',component:BagComponent},
  {path:'audio_from',component:AudioComponent},
  {path:'check-out',component:CheckoutComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
