import { Keyboard } from './models/keyboard.model';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LaptopFilterPipe } from './filter/laptop-filter.pipe';
import { LaptopAllComponent } from './laptop-all/laptop-all.component';
import { DesktopFormComponent } from './desktop-all/desktop-form/desktop-form.component';
import { LaptopFormComponent } from './laptop-all/laptop-form/laptop-form.component';
import { LaptopComponent } from './laptop-all/laptop/laptop.component';
import { ViewDetailComponent } from './laptop-all/view-detail/view-detail.component';
import { AppComponent } from './app.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { FeedbackComponent } from './customer-service/feedback/feedback.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TremConditionComponent } from './trem-condition/trem-condition.component';
import { DesktopAllComponent } from './desktop-all/desktop-all.component';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorAllComponent } from './monitor/monitor-all/monitor-all.component';
import { MonitorFormComponent } from './monitor/monitor-form/monitor-form.component';
import { PrinterComponent } from './printer/printer.component';
import { PrinterFormComponent } from './printer/printer-form/printer-form.component';
import { GamingComponent } from './gaming/gaming.component';
import { GamingFormComponent } from './gaming/gaming-form/gaming-form.component';
import { MouseComponent } from './accessories/mouse/mouse.component';
import { KeyboardComponent } from './accessories/keyboard/keyboard.component';
import { PenComponent } from './accessories/pen/pen.component';
import { BagComponent } from './accessories/bag/bag.component';
import { AudioComponent } from './accessories/audio/audio.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { AudiosComponent } from './accessories/audio/audios/audios.component';
import { BagsComponent } from './accessories/bag/bags/bags.component';
import { MousesComponent } from './accessories/mouse/mouses/mouses.component';
import { PensComponent } from './accessories/pen/pens/pens.component';
import { KeyboardsComponent } from './accessories/keyboard/keyboards/keyboards.component';
import { AuthServiceService } from './service/auth-service.service';
import {AngularFireModule} from '@angular/fire/compat';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LaptopFormComponent,
    FooterComponent,
    LaptopComponent,
    LaptopFilterPipe,
    ViewDetailComponent,
    LaptopAllComponent,
    DesktopAllComponent,
    DesktopFormComponent,
    LaptopFilterPipe,
    CustomerServiceComponent,
    AboutUsComponent,
    TremConditionComponent,
    FeedbackComponent,
    ManageAdminComponent,
    CartComponent,
    CheckoutComponent,
    MonitorComponent,
    MonitorAllComponent,
    MonitorFormComponent,
    PrinterComponent,
    PrinterFormComponent,
    GamingComponent,
    GamingFormComponent,
    PenComponent,
    KeyboardsComponent,
    AudiosComponent,
    BagsComponent,
    MousesComponent,
    PensComponent,
    MouseComponent,
    KeyboardComponent,
    BagComponent,
    AudioComponent,
    SignInFormComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),

   
    
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
