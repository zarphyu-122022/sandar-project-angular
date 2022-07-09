import { AuthServiceService } from './../service/auth-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Gaming } from '../models/gaming.model';
import { CartServiceService } from '../service/cart-service.service';
import { GamingService } from '../service/gaming.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-gaming',
  templateUrl: './gaming.component.html',
  styleUrls: ['./gaming.component.css']
})
export class GamingComponent implements OnInit {

  users$!: Observable<Array<Gaming>>;
  gaming: Gaming |any ;
  gaming_form: Gaming[] = [];
  brand_name_filter: string = '';
  public productlist: any;
  closeResult: string='';

  isFashing = false;
  url: any
  
  
  
  constructor( private readonly storageSrv: StorageService,private gamingService:GamingService,
     private router: Router,private route :ActivatedRoute,private modalService: NgbModal,
     private cartService: CartServiceService,public authService:AuthServiceService) { }

  ngOnInit(): void {
    this.gamingService.fetchAllUser()
      .subscribe(post => {
        this.gaming_form = post;

        this.gaming_form.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        })


      })

      this.route.params.subscribe(
        (params :Params)=>{
          let id= params['id'];
          if(id){
            this.gaming=this.gamingService.findIdByUser(id)
          }

        }
      )
  }

  addtoCart(gaming: any) {
    this.cartService.addToCart(gaming)

  }

  edit(gaming:Gaming) {
    this.router.navigate(['gaming_from'], { relativeTo: this.route, queryParams: { id:gaming.brand_id } })
    
  }
  
  delete(content:any,gaming:Gaming) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.gamingService.deleteById(gaming.brand_id)
        .then(() => this.storageSrv.deleteImage(gaming.brand_id))
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
    this.users$ = this.gamingService.fetchAllUser();
  }

}
