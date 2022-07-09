import { MouseService } from './../../../service/mouse.service';
import { Mouse } from './../../../models/mouse.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-mouses',
  templateUrl: './mouses.component.html',
  styleUrls: ['./mouses.component.css']
})
export class MousesComponent implements OnInit {

  users$!: Observable<Array<Mouse>>;
  mouse: Mouse |any ;
  mouse_form: Mouse[] = [];
  brand_name_filter: string = '';
  public productlist: any;
  closeResult: string='';

  isFashing = false;
  url: any
  
  
  
  constructor( private readonly storageSrv: StorageService,private mouseService:MouseService,
     private router: Router,private route :ActivatedRoute,private modalService: NgbModal,
     private cartService: CartServiceService,public authService:AuthServiceService) { }

  ngOnInit(): void {
    this.mouseService.fetchAllUser()
      .subscribe(post => {
        this.isFashing = false;
        this.mouse_form = post;

        this.mouse_form.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        })


      })

      this.route.params.subscribe(
        (params :Params)=>{
          let id= params['id'];
          if(id){
            this.mouse=this.mouseService.findIdByUser(id)
          }

        }
      )
  }

  addtoCart(accessories: any) {
    this.cartService.addToCart(accessories)

  }

  edit(mouse:Mouse) {
    this.router.navigate(['mouse_form'], { relativeTo: this.route, queryParams: { id:mouse.brand_id } })
    
  }
  
  delete(content:any,mouse:Mouse) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.mouseService.deleteById(mouse.brand_id)
        .then(() => this.storageSrv.deleteImage(mouse.brand_id))
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
    this.users$ = this.mouseService.fetchAllUser();
  }

}
