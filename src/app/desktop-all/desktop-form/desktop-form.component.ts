import { DesktopService } from './../../service/desktop.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-desktop-form',
  templateUrl: './desktop-form.component.html',
  styleUrls: ['./desktop-form.component.css']
})
export class DesktopFormComponent implements OnInit {

  desktop_form_group:FormGroup |any;
  brand_name=['Spectre','ENVY','Pavilion','Essential Home','OMEN','ZBook','EliteBook','ProBook','VICTUS']
  brand_type=['Spectre X360 Laptops','Envy x360 Laptops','Envy 15','Envy 14']
  processror=['Intel® Core™ i7 processor ','Intel® Core™ i5 processor']
  processor_generation=['11th Generation Intel® Core™ i7 processor','11th Generation Intel® Core™ i5 processor']
  screen_size=['13.5-inch (34.29 cm)','16-inch (40.64 cm)']
  menory=['8 GB','16 GB']
  operation=['Windows 11 Home']
  graphic=['NVIDIA® GeForce RTX™ 3050','Intel® Iris® Xe graphics']
  color=['Nightfall black','Nocturne blue','Poseidon blue']
  


img :string='';
selectImage  :any=null;

  constructor( private desktopService:DesktopService,private http: HttpClient,private postService :PostService) { }

  ngOnInit(): void {
    this.desktop_form_group= new FormGroup({
      'brand_id':new FormControl(null,[Validators.required]),
      'brand_name':new FormControl(null,[Validators.required]),
      'brand_type':new FormControl(null,[Validators.required]),
      'processor':new FormControl(null,[Validators.required]),
      'processor_generation':new FormControl(null,[Validators.required]),
      'memory':new FormControl(null,[Validators.required]),
      'operation':new FormControl(null,[Validators.required]),
      'graphic':new FormControl(null,[Validators.required]),
      'screen_size':new FormControl(null,[Validators.required]),
      'weight':new FormControl(null,[Validators.required]),
      'color':new FormControl(null,[Validators.required]),
      'instock':new FormControl(null,[Validators.required]),
      'price':new FormControl(null,[Validators.required]),
      'image':new FormControl(null,[Validators.required]),
      'addfeature':new FormArray([]),
      'addinclude':new FormArray([]),

    })

    
  }

  get addfeature(){
    return this.desktop_form_group.get('addfeature') as FormArray;
  }
  removefeature(i:number){
    this.addfeature.removeAt(i)

  }

  addOtherfeature(){
    this.addfeature.push(new FormGroup({
      addingfeature :new FormControl()
    }))
  }


  get addinclude(){
    return this.desktop_form_group.get('addinclude') as FormArray;
  }
  removeinclude(i:number){
     this.addinclude.removeAt(i)

  }

  addOtherinclude(){
    this.addinclude.push(new FormGroup({
      addinginclude :new FormControl()
    }))
  }

  save(desktop_form_group:FormGroup){
    // if(this.laptop_form_group.valid){
    //   var filepath=`${laptop_form_group}/${this.selectImage.name}_${new Date().getTime()}`
    //   this.postService.createAndstorePost(filepath,laptop_form_group)
    // }




   this.desktopService.createAndstorePost(desktop_form_group.value)
    
    console.log(desktop_form_group.value)
    desktop_form_group.reset()
  }
  onFileChanged(event :any){
    if(event.target.files && event.target.files[0]){
      const reader =new FileReader
      reader.onload=(e:any)=>this.img=e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectImage=event.target.files[0]
    }

  }

}
