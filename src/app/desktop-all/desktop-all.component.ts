import { PostService } from 'src/app/service/posts.service';
import { StorageService } from './../service/storage.service';
import { Observable } from 'rxjs';
import { AuthServiceService } from './../service/auth-service.service';
import { LaptopServiceService } from 'src/app/service/laptop-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { Desktop } from '../models/desktop.model';
import { DesktopService } from '../service/desktop.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-laptop',
  templateUrl: './desktop-all.component.html',
  styleUrls: ['./desktop-all.component.css']
})
export class DesktopAllComponent implements OnInit {
  users$!: Observable<Array<Desktop>>;
  desktop: Desktop |any ;
  desktop_form: Desktop[] = [];
  brand_name_filter: string = '';
  public productlist: any;
  closeResult: string='';

  isFashing = false;
  url: any
  
  
  
  constructor( private readonly storageSrv: StorageService,
     private router: Router,private route :ActivatedRoute,private modalService: NgbModal,
     private cartService: CartServiceService, private desktopService: DesktopService,public authService:AuthServiceService) { }

  ngOnInit(): void {
    this.isFashing = true;
    this.desktopService.fetchAllUser()
      .subscribe(post => {
        this.isFashing = false;
        this.desktop_form = post;

        this.desktop_form.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        })

        




      })

      this.route.params.subscribe(
        (params :Params)=>{
          let id= params['id'];
          if(id){
            this.desktop=this.desktopService.findIdByUser(id)
          }

        }
      )
  }

  addtoCart(desktop: any) {
    this.cartService.addToCart(desktop)

  }

  edit(desktop:Desktop) {
    this.router.navigate(['desktop_from'], { relativeTo: this.route, queryParams: { id:desktop.brand_id } })
    
  }
  
  delete(content:any,desktop:Desktop) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.desktopService.deleteById(desktop.brand_id)
        .then(() => this.storageSrv.deleteImage(desktop.brand_id))
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
    this.users$ = this.desktopService.fetchAllUser();
  }
}
