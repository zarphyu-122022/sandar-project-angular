import { AudioService } from './../../../service/audio.service';
import { Audio } from './../../../models/audio.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.css']
})
export class AudiosComponent implements OnInit {

  users$!: Observable<Array<Audio>>;
  audio: Audio |any ;
  audio_form: Audio[] = [];
  brand_name_filter: string = '';
  public productlist: any;
  closeResult: string='';

  isFashing = false;
  url: any
  
  
  
  constructor( private readonly storageSrv: StorageService,private audioService:AudioService,
     private router: Router,private route :ActivatedRoute,private modalService: NgbModal,
     private cartService: CartServiceService,public authService:AuthServiceService) { }

  ngOnInit(): void {
    this.audioService.fetchAllUser()
      .subscribe(post => {
        this.isFashing = false;
        this.audio_form = post;

        this.audio_form.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        })


      })

      this.route.params.subscribe(
        (params :Params)=>{
          let id= params['id'];
          if(id){
            this.audio=this.audioService.findIdByUser(id)
          }

        }
      )
  }

  addtoCart(audio: any) {
    this.cartService.addToCart(audio)

  }

  edit(audio:Audio) {
    this.router.navigate(['audio_form'], { relativeTo: this.route, queryParams: { id:audio.brand_id } })
    
  }
  
  delete(content:any,audio:Audio) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.audioService.deleteById(audio.brand_id)
        .then(() => this.storageSrv.deleteImage(audio.brand_id))
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
    this.users$ = this.audioService.fetchAllUser();
  }

}
