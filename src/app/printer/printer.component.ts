import { AuthServiceService } from './../service/auth-service.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Printer } from './../models/printer.model';
import { HttpClient } from '@angular/common/http';
import { LaptopServiceService } from './../service/laptop-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PrinterService } from '../service/printer.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Desktop } from '../models/desktop.model';
import { Monitor } from '../models/monitor.model';
import { MonitorService } from '../service/monitor.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.css']
})
export class PrinterComponent implements OnInit {
  users$!: Observable<Array<Printer>>;
  printer: Printer |any ;
  printer_form: Printer[] = [];
  brand_name_filter: string = '';
  public productlist: any;
  closeResult: string='';

  isFashing = false;
  url: any
  
  
  
  constructor( private readonly storageSrv: StorageService,
     private router: Router,private route :ActivatedRoute,private modalService: NgbModal,
     private cartService: CartServiceService, private printerService: PrinterService,
     public authService:AuthServiceService) { }

  ngOnInit(): void {
    this.printerService.fetchAllUser()
      .subscribe(post => {
        this.printer_form = post;

        this.printer_form.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        })


      })

      this.route.params.subscribe(
        (params :Params)=>{
          let id= params['id'];
          if(id){
            this.printer=this.printerService.findIdByUser(id)
          }

        }
      )
  }

  addtoCart(printer: any) {
    this.cartService.addToCart(printer)

  }

  edit(printer:Printer) {
    this.router.navigate(['printer_from'], { relativeTo: this.route, queryParams: { id:printer.brand_id } })
    
  }
  
  delete(content:any,printer:Printer) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.printerService.deleteById(printer.brand_id)
        .then(() => this.storageSrv.deleteImage(printer.brand_id))
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
    this.users$ = this.printerService.fetchAllUser();
  }
  
  }


