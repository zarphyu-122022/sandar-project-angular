import { PenService } from './../../../service/pen.service';
import { Pen } from './../../../models/pen.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-pens',
  templateUrl: './pens.component.html',
  styleUrls: ['./pens.component.css']
})
export class PensComponent implements OnInit {

  users$!: Observable<Array<Pen>>;
  pen: Pen |any ;
  pen_form: Pen[] = [];
  brand_name_filter: string = '';
  public productlist: any;
  closeResult: string='';

  isFashing = false;
  url: any
  
  
  
  constructor( private readonly storageSrv: StorageService,private penService:PenService,
     private router: Router,private route :ActivatedRoute,private modalService: NgbModal,
     private cartService: CartServiceService,public authService:AuthServiceService) { }

  ngOnInit(): void {
    this.penService.fetchAllUser()
      .subscribe(post => {
        this.isFashing = false;
        this.pen_form = post;

        this.pen_form.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        })


      })

      this.route.params.subscribe(
        (params :Params)=>{
          let id= params['id'];
          if(id){
            this.pen=this.penService.findIdByUser(id)
          }

        }
      )
  }

  addtoCart(accessories: any) {
    this.cartService.addToCart(accessories)

  }

  edit(pen:Pen) {
    this.router.navigate(['pen_form'], { relativeTo: this.route, queryParams: { id:pen.brand_id } })
    
  }
  
  delete(content:any,pen:Pen) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.penService.deleteById(pen.brand_id)
        .then(() => this.storageSrv.deleteImage(pen.brand_id))
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
    this.users$ = this.penService.fetchAllUser();
  }

}
