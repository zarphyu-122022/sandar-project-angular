import { Pen } from './../models/pen.model';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { child, DatabaseReference, equalTo, get, orderByChild, query, ref, remove, update } from 'firebase/database';
import { Database, listVal, objectVal } from '@angular/fire/database';
import { iif, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PenService {

    readonly dbRef: DatabaseReference;

    constructor(private readonly db: Database) {
      this.dbRef = ref(db);
    }
  
    saveUser(pen: Pen) {
      const saveValue: any = {};
      saveValue[`pen/${pen.brand_id}`] = pen;
      return update(this.dbRef, saveValue);
    }
  
    findIdByUser(id: string) {
      return get(child(this.dbRef, `pen/${id}`))
        .then(snapshot => {
          const val = snapshot.val();
          if (val) {
            return { id, ...val }
          }
          return val;
        });
    }
  
    deleteById(id: string) {
      return remove(child(this.dbRef, `pen/${id}`));
    }
  
    fetchAllUser() {
      return objectVal<Pen>(child(this.dbRef, 'pen')).pipe(this.convertToUserResponse$);
    }
  
    searchByName(name: string) {
      return name ?
        listVal<Pen>(
          query(child(this.dbRef, 'pen'), orderByChild('name'), equalTo(name))
          ).pipe(this.convertToUserResponse$) : this.fetchAllUser();
    }
  
    private convertToUserResponse$(input$: Observable<any>): Observable<Array<Pen>> {
      return input$.pipe(
        switchMap(resp => iif(() => !!resp, of(resp), of({}))),
        map(resp => Object.keys(resp).map(key => ({ ...resp[key], id: key, })))
      );
    }
      

      
}
