import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Monitor } from 'src/app/models/monitor.model';
import { LaptopServiceService } from 'src/app/service/laptop-service.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { MonitorService } from 'src/app/service/monitor.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Desktop } from 'src/app/models/desktop.model';
import { DesktopService } from 'src/app/service/desktop.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-monitor-all',
  templateUrl: './monitor-all.component.html',
  styleUrls: ['./monitor-all.component.css']
})
export class MonitorAllComponent implements OnInit {

  users$!: Observable<Array<Desktop>>;
  monitor: Monitor |any ;
  monitor_form: Monitor[] = [];
  brand_name_filter: string = '';
  public productlist: any;
  closeResult: string='';

  isFashing = false;
  url: any
  
  
  
  constructor( private readonly storageSrv: StorageService,
     private router: Router,private route :ActivatedRoute,private modalService: NgbModal,
     private cartService: CartServiceService, private monitorService: MonitorService,
     public authService:AuthServiceService) { }

  ngOnInit(): void {
    this.monitorService.fetchAllUser()
      .subscribe(post => {
        this.monitor_form = post;

        this.monitor_form.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        })


      })

      this.route.params.subscribe(
        (params :Params)=>{
          let id= params['id'];
          if(id){
            this.monitor=this.monitorService.findIdByUser(id)
          }

        }
      )
  }

  addtoCart(monitor: any) {
    this.cartService.addToCart(monitor)

  }

  edit(monitor:Monitor) {
    this.router.navigate(['monitor_from'], { relativeTo: this.route, queryParams: { id:monitor.brand_id } })
    
  }
  
  delete(content:any,monitor:Monitor) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.monitorService.deleteById(monitor.brand_id)
        .then(() => this.storageSrv.deleteImage(monitor.brand_id))
        .then(() => {
          this.loadData();
        }) 
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  }  
  
  private getDismissReason(reason: any): string {  
    if (reason === ModalDismissReasons.ESC) {  
      return 'by pressing ESC';  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
      return 'by clicking on a backdrop';  
    } else {  
      return `with: ${reason}`;  
    }  
  }  
  private loadData() {
    this.users$ = this.monitorService.fetchAllUser();
  }

}
