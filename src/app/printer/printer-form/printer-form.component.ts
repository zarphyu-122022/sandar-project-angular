import { Printer } from './../../models/printer.model';
import { PrinterService } from './../../service/printer.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map, EMPTY, switchMap } from 'rxjs';
import { Monitor } from 'src/app/models/monitor.model';
import { StorageService } from 'src/app/service/storage.service';
import { uuidv4 } from '@firebase/util';

@Component({
  selector: 'app-printer-form',
  templateUrl: './printer-form.component.html',
  styleUrls: ['./printer-form.component.css']
})
export class PrinterFormComponent implements OnInit {

  printer_form_group!: FormGroup;
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
  userId: string = '';

  printer:Printer | any;
  


  constructor(private readonly fb: FormBuilder, private http: HttpClient,
    private printerService: PrinterService,private readonly sanitizer: DomSanitizer,
    private readonly storageSrv: StorageService,
     private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.printer_form_group = new FormGroup({
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
          return this.printerService.findIdByUser(this.userId).then((data: any) => this.initializeForm(data));
        }
        this.initializeForm();
        return EMPTY;
      }),
    ).subscribe();

      

  }
  selectedFile($event: any) {
    const file = $event.target.files[0];
    if (file) {
      this.printer_form_group.get('profileImageFile')?.setValue(file);
      this.printer_form_group.get('profileImage')?.setValue(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)));
    }

  }
  get profileImage() {
    return this.printer_form_group.get('profileImage')?.value;
  }
 

  


  save(printer_form_group: FormGroup) {
    const formValue = { ...this.printer_form_group.value };
    const uuid = uuidv4();
    if (!formValue.brand_id) formValue.brand_id = uuid;

    this.storageSrv.uploadImage(formValue.profileImageFile, uuid).pipe(
      switchMap(profileUrl => {
        if (profileUrl || formValue.profileImageFile === null) formValue.profileImage = profileUrl;
        delete formValue.profileImageFile;


        return this.printerService.saveUser(formValue);
      })).subscribe();
      printer_form_group.reset()
      this.router.navigate(['/printer'])

  }

  
  private initializeForm(initData?:Printer) {
    this.printer_form_group = this.fb.group({
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
