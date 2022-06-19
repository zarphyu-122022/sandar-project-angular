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
  ngOnInit(): void {}

  // invoice: Invoice |any;

  // constructor(private invoiceService: InvoiceService, private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.route.params.pipe(
  //     switchMap(
  //       (params: Params) => {
  //         let id = params['id'];
  //         return this.invoiceService.findById(+id)
  //       }
  //     )
  //   ).subscribe(
  //     invoice => this.invoice = invoice
  //   )
  // }

}
