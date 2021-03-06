import { CartServiceService } from 'src/app/service/cart-service.service';
import { Laptop } from 'src/app/models/laptop.model';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Invoice } from '../models/invoice.model';
import { InvoiceService } from '../service/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoice :Invoice | any
  

  

  constructor(private CartService:CartServiceService){}
  ngOnInit(): void {
  }

}
