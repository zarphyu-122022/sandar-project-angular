import { Bag } from './../models/bag.model';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { child, DatabaseReference, equalTo, get, orderByChild, query, ref, remove, update } from 'firebase/database';
import { Database, listVal, objectVal } from '@angular/fire/database';
import { iif, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BagService {

    readonly dbRef: DatabaseReference;

    constructor(private readonly db: Database) {
      this.dbRef = ref(db);
    }
  
    saveUser(bag: Bag) {
      const saveValue: any = {};
      saveValue[`bag/${bag.brand_id}`] = bag;
      return update(this.dbRef, saveValue);
    }
  
    findIdByUser(id: string) {
      return get(child(this.dbRef, `bag/${id}`))
        .then(snapshot => {
          const val = snapshot.val();
          if (val) {
            return { id, ...val }
          }
          return val;
        });
    }
  
    deleteById(id: string) {
      return remove(child(this.dbRef, `bag/${id}`));
    }
  
    fetchAllUser() {
      return objectVal<Bag>(child(this.dbRef, 'bag')).pipe(this.convertToUserResponse$);
    }
  
    searchByName(name: string) {
      return name ?
        listVal<Bag>(
          query(child(this.dbRef, 'bag'), orderByChild('name'), equalTo(name))
          ).pipe(this.convertToUserResponse$) : this.fetchAllUser();
    }
  
    private convertToUserResponse$(input$: Observable<any>): Observable<Array<Bag>> {
      return input$.pipe(
        switchMap(resp => iif(() => !!resp, of(resp), of({}))),
        map(resp => Object.keys(resp).map(key => ({ ...resp[key], id: key, })))
      );
    }
      

      
}
