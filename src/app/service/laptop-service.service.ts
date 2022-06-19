import { Laptop } from 'src/app/models/laptop.model';
import { FormGroup, NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaptopServiceService {
  laptopchange=new Subject<Laptop[]>();


  private _laptop: Laptop[] =[
    // {
    // 'brand_id':'1',
    // 'brand_name':'Spectre',
    // 'processor':'processor',
    // 'prosessor_generation':'processor generation',
    // 'memory':'8gb',
    // 'graphic':'graphic',
    // 'color':'color',
    // 'instock':'1',
    // 'operation':'operation',
    // 'price':'123',
    // 'image':'https://static-01.shop.com.mm/p/c80852287afbc6179ceb694c85317990.png',
    // 'otherfeature':'oppp',
    // 'otherinclude':'oppp',
    // 'brand_type':'kkkk',
    // 'screen_size':'233',
    // 'weight':'22'
    // }

  ]
  setLaptop(Laptop :Laptop[]){
    this._laptop=Laptop


  }
    
      
    
    
  
  constructor() { }

  save(laptop:Laptop){
    this._laptop.push(laptop)
  }

  get laptop(){
    return this._laptop;
  }
  findById(brand_id:number){
    return this._laptop.find(laptop => laptop.brand_id === brand_id);
  }


}
