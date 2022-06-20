import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
// import {AngularFireModule} from '@angular/fire';
// import {AngularFireDatabaseModule} from '@angularfire/database'

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LaptopFilterPipe } from './filter/laptop-filter.pipe';
import { LaptopAllComponent } from './laptop-all/laptop-all.component';
import { DesktopFormComponent } from './desktop-all/desktop-form/desktop-form.component';
import { DesktopDetailComponent } from './desktop-all/desktop-detail/desktop-detail.component';
import { LaptopFormComponent } from './laptop-all/laptop-form/laptop-form.component';
import { LaptopComponent } from './laptop-all/laptop/laptop.component';
import { DesktopComponent } from './desktop-all/desktop/desktop.component';
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
import { MonitorDetailComponent } from './monitor/monitor-detail/monitor-detail.component';
import { MonitorFormComponent } from './monitor/monitor-form/monitor-form.component';
import { environment } from 'src/environments/environment.prod';
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
    DesktopComponent,
    DesktopFormComponent,
    DesktopDetailComponent,
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
    MonitorDetailComponent,
    MonitorFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule
    
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
