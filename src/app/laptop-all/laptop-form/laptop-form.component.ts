import { ActivatedRoute, Params } from '@angular/router';
import { Laptop } from 'src/app/models/laptop.model';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray, NgForm } from '@angular/forms';
import { Component, OnInit, Pipe } from '@angular/core';
import { LaptopServiceService } from 'src/app/service/laptop-service.service';
import { PostService } from 'src/app/service/posts.service';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-laptop-form',
  templateUrl: './laptop-form.component.html',
  styleUrls: ['./laptop-form.component.css']
})
export class LaptopFormComponent implements OnInit {

  laptop_form_group: FormGroup | any;
  brand_name = ['Spectre', 'ENVY', 'Pavilion', 'Essential Home', 'OMEN', 'ZBook', 'EliteBook', 'ProBook', 'VICTUS']
  brand_type = ['Spectre X360 Laptops', 'Envy x360 Laptops', 'Envy 15', 'Envy 14']
  processror = ['Intel® Core™ i7 processor ', 'Intel® Core™ i5 processor']
  processorGeneration = ['11th Generation Intel® Core™ i7 processor', '11th Generation Intel® Core™ i5 processor']
  screen_size = ['13.5-inch (34.29 cm)', '16-inch (40.64 cm)']
  menory = ['8 GB', '16 GB']
  operation = ['Windows 11 Home']
  graphic = ['NVIDIA® GeForce RTX™ 3050', 'Intel® Iris® Xe graphics']
  color = ['Nightfall black', 'Nocturne blue', 'Poseidon blue']
  otherInclude = ['1 Year Warranty', '2 Year Warranty', '3 Year Warranty']


  img: string = '';
  selectImage: any = null;

  laptop:Laptop | any;

  constructor(private laptopService: LaptopServiceService, private http: HttpClient,
    private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.laptop_form_group = new FormGroup({
      'brand_id': new FormControl(null, [Validators.required]),
      'brand_name': new FormControl(null, [Validators.required]),
      'brand_type': new FormControl(null, [Validators.required]),
      'processor': new FormControl(null, [Validators.required]),
      'processorGeneration': new FormControl(null, [Validators.required]),
      'memory': new FormControl(null, [Validators.required]),
      'operation': new FormControl(null, [Validators.required]),
      'graphic': new FormControl(null, [Validators.required]),
      'screen_size': new FormControl(null, [Validators.required]),
      'weight': new FormControl(null, [Validators.required]),
      'color': new FormControl(null, [Validators.required]),
      'instock': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'image': new FormControl(null, [Validators.required]),
      'otherinclude': new FormControl(null, [Validators.required]),

    })

    // this.route.paramMap.subscribe(parameterMap => {
    //   const id = parameterMap.get('id')
    //   this.getLaptop(id);
    // })

    // this.route.params.subscribe(
    //   (params :Params)=>{
    //     let id=params['brand_id']
    //     if(id){
    //       this.laptop=this.postService.edit(+id,this.laptop)
    //     }

    //   }
    // )


  }

  // private getLaptop(id: any) {
  //   if (id == 0) {
  //     this.laptop = {
  //       brand_id: null,
  //       brand_name: null,
  //       brand_type: null,
  //       processor: null,
  //       processorGeneration: null,
  //       memory: null,
  //       operation: null,
  //       graphic: null,
  //       screen_size: null,
  //       weight: null,
  //       color: null,
  //       instock: null,
  //       price: null,
  //       otherinclude: null,
  //       image: null

  //     };
  //     }else{
  //       this.laptopService.laptop
  //     }
  //   }

  // }


  save(laptop_form_group: FormGroup) {
    const fv = laptop_form_group.value;
    fv.image = this.img;
    this.postService.createAndstorePost(fv);
    console.log(fv)
    laptop_form_group.reset()

  }

  onFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader
      reader.onload = (e: any) => this.img = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectImage = event.target.files[0]
    }

  }


}







