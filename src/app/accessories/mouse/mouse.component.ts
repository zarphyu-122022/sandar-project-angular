import { MouseService } from './../../service/mouse.service';
import { Mouse } from './../../models/mouse.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { uuidv4 } from '@firebase/util';
import { map, EMPTY, switchMap } from 'rxjs';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-mouse',
  templateUrl: './mouse.component.html',
  styleUrls: ['./mouse.component.css']
})
export class MouseComponent implements OnInit {

  mouse_form_group:FormGroup |any;
  brand_name=['Spectre','ENVY','Pavilion','Essential Home','OMEN','ZBook','EliteBook','ProBook','VICTUS']
  brand_type=['Spectre X360 Laptops','Envy x360 Laptops','Envy 15','Envy 14']
  color=['Nightfall black','Nocturne blue','Poseidon blue']
  otherInclude = ['1 Year Warranty', '2 Year Warranty', '3 Year Warranty']
  
  img: string = '';
  selectImage: any = null;
  userId: string = '';

  mouse:Mouse | any;
  



constructor(private readonly fb: FormBuilder, private http: HttpClient,
  private mouseService: MouseService,private readonly sanitizer: DomSanitizer,
  private readonly storageSrv: StorageService,
   private route: ActivatedRoute,private router:Router) { }

ngOnInit(): void {
  this.mouse_form_group = new FormGroup({
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
    'profileImage': new FormControl(null, [Validators.required]),
    'otherinclude': new FormControl(null, [Validators.required]),

    

  })

  this.route.queryParams.pipe(
    map(params => {
      this.userId = params['id'];
      if (this.userId) {
        return this.mouseService.findIdByUser(this.userId).then((data: any) => this.initializeForm(data));
      }
      this.initializeForm();
      return EMPTY;
    }),
  ).subscribe();

    

}
selectedFile($event: any) {
  const file = $event.target.files[0];
  if (file) {
    this.mouse_form_group.get('profileImageFile')?.setValue(file);
    this.mouse_form_group.get('profileImage')?.setValue(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)));
  }

}
get profileImage() {
  return this.mouse_form_group.get('profileImage')?.value;
}





save(mouse_form_group: FormGroup) {
  const formValue = { ...this.mouse_form_group.value };
  const uuid = uuidv4();
  if (!formValue.brand_id) formValue.brand_id = uuid;

  this.storageSrv.uploadImage(formValue.profileImageFile, uuid).pipe(
    switchMap(profileUrl => {
      if (profileUrl || formValue.profileImageFile === null) formValue.profileImage = profileUrl;
      delete formValue.profileImageFile;


      return this.mouseService.saveUser(formValue);
    })).subscribe();
    mouse_form_group.reset()
    this.router.navigate(['/mouse'])

}


private initializeForm(initData?: Mouse) {
  this.mouse_form_group = this.fb.group({
    brand_id: initData?.brand_id,
    brand_name:initData?.brand_name,
    brand_type: initData?.brand_type,
    processor: initData?.processor,
    processorGeneration:initData?.processorGeneration,
    memory:initData?.memory,
    operation:initData?.operation,
    graphic:initData?.graphic,
    screen_size:initData?.screen_size,
    weight:initData?.weight,
    color:initData?.color,
    instock:initData?.instock,
    price:initData?.price,
    otherinclude:initData?.otherinclude,
    profileImage: initData?.profileImage,
    profileImageFile: '',
  })
}


}
