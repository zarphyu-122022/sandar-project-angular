import { LaptopServiceService } from 'src/app/service/laptop-service.service';
import { Laptop } from './../../models/laptop.model';
import { Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { PostService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit {
  laptop: Laptop | any  ;
  laptop_form: Laptop[] = [];
  brand_name_filter: string = '';
  public productlist: any;
  public editMode :boolean =false;

  isFashing = false;
  url: any
  constructor(private laptopService: LaptopServiceService, private router: Router, private cartService: CartServiceService, private postService: PostService) { }

  ngOnInit(): void {
    this.isFashing = true;
    this.postService.fetchPost()
      .subscribe(post => {
        this.isFashing = false;
        this.laptop_form = post;

        this.laptop_form.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        })


      })
  }



  addtoCart(laptop: any) {
    this.cartService.addToCart(laptop)

  }

  edit(id: number, index: number) {
    this.editMode=true;
    this.router.navigate(['/edit', id])
    console.log(this.laptop_form[index])

    this.postService.edit(id,this.laptop_form[index])

    

  }

  delete(id: number) {

  }










}
