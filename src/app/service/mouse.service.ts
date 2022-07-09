import { Mouse } from './../models/mouse.model';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { child, DatabaseReference, equalTo, get, orderByChild, query, ref, remove, update } from 'firebase/database';
import { Database, listVal, objectVal } from '@angular/fire/database';
import { iif, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MouseService {

    readonly dbRef: DatabaseReference;

    constructor(private readonly db: Database) {
      this.dbRef = ref(db);
    }
  
    saveUser(mouse: Mouse) {
      const saveValue: any = {};
      saveValue[`mouse/${mouse.brand_id}`] = mouse;
      return update(this.dbRef, saveValue);
    }
  
    findIdByUser(id: string) {
      return get(child(this.dbRef, `mouse/${id}`))
        .then(snapshot => {
          const val = snapshot.val();
          if (val) {
            return { id, ...val }
          }
          return val;
        });
    }
  
    deleteById(id: string) {
      return remove(child(this.dbRef, `mouse/${id}`));
    }
  
    fetchAllUser() {
      return objectVal<Mouse>(child(this.dbRef, 'mouse')).pipe(this.convertToUserResponse$);
    }
  
    searchByName(name: string) {
      return name ?
        listVal<Mouse>(
          query(child(this.dbRef, 'mouse'), orderByChild('name'), equalTo(name))
          ).pipe(this.convertToUserResponse$) : this.fetchAllUser();
    }
  
    private convertToUserResponse$(input$: Observable<any>): Observable<Array<Mouse>> {
      return input$.pipe(
        switchMap(resp => iif(() => !!resp, of(resp), of({}))),
        map(resp => Object.keys(resp).map(key => ({ ...resp[key], id: key, })))
      );
    }
      

      
}
