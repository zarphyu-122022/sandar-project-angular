import { Printer } from './../models/printer.model';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { child, DatabaseReference, equalTo, get, orderByChild, query, ref, remove, update } from 'firebase/database';
import { Database, listVal, objectVal } from '@angular/fire/database';
import { iif, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

    readonly dbRef: DatabaseReference;

    constructor(private readonly db: Database) {
      this.dbRef = ref(db);
    }
  
    saveUser(printer: Printer) {
      const saveValue: any = {};
      saveValue[`printer/${printer.brand_id}`] = printer;
      return update(this.dbRef, saveValue);
    }
  
    findIdByUser(id: string) {
      return get(child(this.dbRef, `printer/${id}`))
        .then(snapshot => {
          const val = snapshot.val();
          if (val) {
            return { id, ...val }
          }
          return val;
        });
    }
  
    deleteById(id: string) {
      return remove(child(this.dbRef, `printer/${id}`));
    }
  
    fetchAllUser() {
      return objectVal<Printer>(child(this.dbRef, 'printer')).pipe(this.convertToUserResponse$);
    }
  
    searchByName(name: string) {
      return name ?
        listVal<Printer>(
          query(child(this.dbRef, 'printer'), orderByChild('name'), equalTo(name))
          ).pipe(this.convertToUserResponse$) : this.fetchAllUser();
    }
  
    private convertToUserResponse$(input$: Observable<any>): Observable<Array<Printer>> {
      return input$.pipe(
        switchMap(resp => iif(() => !!resp, of(resp), of({}))),
        map(resp => Object.keys(resp).map(key => ({ ...resp[key], id: key, })))
      );
    }
      

      
}
