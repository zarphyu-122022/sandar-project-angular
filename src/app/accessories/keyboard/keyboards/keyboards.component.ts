import { Keyboard } from './../../../models/keyboard.model';
import { KeyboardService } from './../../../service/keyboard.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-keyboards',
  templateUrl: './keyboards.component.html',
  styleUrls: ['./keyboards.component.css']
})
export class KeyboardsComponent implements OnInit {

  users$!: Observable<Array<Keyboard>>;
  keyboard: Keyboard |any ;
  keyboard_form: Keyboard[] = [];
  brand_name_filter: string = '';
  public productlist: any;
  closeResult: string='';

  isFashing = false;
  url: any
  
  
  
  constructor( private readonly storageSrv: StorageService,private keyboardService:KeyboardService,
     private router: Router,private route :ActivatedRoute,private modalService: NgbModal,
     private cartService: CartServiceService,public authService:AuthServiceService) { }

  ngOnInit(): void {
    this.keyboardService.fetchAllUser()
      .subscribe(post => {
        this.isFashing = false;
        this.keyboard_form = post;

        this.keyboard_form.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        })


      })

      this.route.params.subscribe(
        (params :Params)=>{
          let id= params['id'];
          if(id){
            this.keyboard=this.keyboardService.findIdByUser(id)
          }

        }
      )
  }

  addtoCart(keyboard: any) {
    this.cartService.addToCart(keyboard)

  }

  edit(keyboard:Keyboard) {
    this.router.navigate(['mouse_form'], { relativeTo: this.route, queryParams: { id:keyboard.brand_id } })
    
  }
  
  delete(content:any,keyboard:Keyboard) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.keyboardService.deleteById(keyboard.brand_id)
        .then(() => this.storageSrv.deleteImage(keyboard.brand_id))
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
    this.users$ = this.keyboardService.fetchAllUser();
  }

}
