import { Bag } from './../../../models/bag.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { MouseService } from 'src/app/service/mouse.service';
import { StorageService } from 'src/app/service/storage.service';
import { BagService } from 'src/app/service/bag.service';

@Component({
  selector: 'app-bags',
  templateUrl: './bags.component.html',
  styleUrls: ['./bags.component.css']
})
export class BagsComponent implements OnInit {

  users$!: Observable<Array<Bag>>;
  bag: Bag |any ;
  bag_form: Bag[] = [];
  brand_name_filter: string = '';
  public productlist: any;
  closeResult: string='';

  isFashing = false;
  url: any
  
  
  
  constructor( private readonly storageSrv: StorageService,private bagService:BagService,
     private router: Router,private route :ActivatedRoute,private modalService: NgbModal,
     private cartService: CartServiceService,public authService:AuthServiceService) { }

  ngOnInit(): void {
    this.bagService.fetchAllUser()
      .subscribe(post => {
        this.isFashing = false;
        this.bag_form = post;

        this.bag_form.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        })


      })

      this.route.params.subscribe(
        (params :Params)=>{
          let id= params['id'];
          if(id){
            this.bag=this.bagService.findIdByUser(id)
          }

        }
      )
  }

  addtoCart(bag: any) {
    this.cartService.addToCart(bag)

  }

  edit(bag:Bag) {
    this.router.navigate(['bag_form'], { relativeTo: this.route, queryParams: { id:bag.brand_id } })
    
  }
  
  delete(content:any,bag:Bag) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.bagService.deleteById(bag.brand_id)
        .then(() => this.storageSrv.deleteImage(bag.brand_id))
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
    this.users$ = this.bagService.fetchAllUser();
  }

}
