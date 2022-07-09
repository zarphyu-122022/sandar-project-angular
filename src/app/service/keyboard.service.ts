import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { child, DatabaseReference, equalTo, get, orderByChild, query, ref, remove, update } from 'firebase/database';
import { Database, listVal, objectVal } from '@angular/fire/database';
import { iif, Observable, of, switchMap } from 'rxjs';
import { Keyboard } from "../models/keyboard.model";

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

    readonly dbRef: DatabaseReference;

    constructor(private readonly db: Database) {
      this.dbRef = ref(db);
    }
  
    saveUser(keyboard: Keyboard) {
      const saveValue: any = {};
      saveValue[`keyboard/${keyboard.brand_id}`] = keyboard;
      return update(this.dbRef, saveValue);
    }
  
    findIdByUser(id: string) {
      return get(child(this.dbRef, `keyboard/${id}`))
        .then(snapshot => {
          const val = snapshot.val();
          if (val) {
            return { id, ...val }
          }
          return val;
        });
    }
  
    deleteById(id: string) {
      return remove(child(this.dbRef, `keyboard/${id}`));
    }
  
    fetchAllUser() {
      return objectVal<Keyboard>(child(this.dbRef, 'keyboard')).pipe(this.convertToUserResponse$);
    }
  
    searchByName(name: string) {
      return name ?
        listVal<Keyboard>(
          query(child(this.dbRef, 'keyboard'), orderByChild('name'), equalTo(name))
          ).pipe(this.convertToUserResponse$) : this.fetchAllUser();
    }
  
    private convertToUserResponse$(input$: Observable<any>): Observable<Array<Keyboard>> {
      return input$.pipe(
        switchMap(resp => iif(() => !!resp, of(resp), of({}))),
        map(resp => Object.keys(resp).map(key => ({ ...resp[key], id: key, })))
      );
    }
      

      
}
