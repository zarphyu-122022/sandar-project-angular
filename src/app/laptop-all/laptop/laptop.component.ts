import { uuidv4 } from '@firebase/util';
import { StorageService } from './../../service/storage.service';
import { Observable } from 'rxjs';
import { LaptopServiceService } from 'src/app/service/laptop-service.service';
import { Laptop } from './../../models/laptop.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { PostService } from 'src/app/service/posts.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit {
  users$!: Observable<Array<Laptop>>;
  laptop: Laptop | any;
  laptop_form: Laptop[] = [];
  brand_name_filter: string = '';
  public productlist: any;
  closeResult: string = '';

  isFashing = false;
  url: any



  constructor(private laptopService: LaptopServiceService, private readonly storageSrv: StorageService,
    private router: Router, private route: ActivatedRoute, private modalService: NgbModal,
    private cartService: CartServiceService, private postService: PostService, public authService: AuthServiceService) { }

  ngOnInit(): void {
    this.postService.fetchAllUser()
      .subscribe(post => {
        this.laptop_form = post;

        this.laptop_form.forEach((a: any) => {
          Object.assign(a, { quantity:1,total: a.price  })
        })




      })

    this.route.params.subscribe(
      (params: Params) => {
        let id = params['brand_id'];
        if (id) {
          this.laptop = this.postService.findIdByUser(id)
        }

      }
    )
  }

  addtoCart(laptop: any) {
    this.cartService.addToCart(laptop)

  }

  edit(laptop:Laptop) {
    
    this.router.navigate(['laptop_from'], { relativeTo: this.route, queryParams: { id:laptop.brand_id } })

  }

  deleteUser(content: any, laptop:Laptop) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.postService.deleteById(laptop.brand_id)
          .then(() => this.storageSrv.deleteImage(laptop.brand_id))
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
    this.users$ = this.postService.fetchAllUser();
  }




}


















