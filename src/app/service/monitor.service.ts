import { Desktop } from './../models/desktop.model';
import { Injectable } from "@angular/core";
import { Monitor } from '../models/monitor.model';
import { child, Database, DatabaseReference, equalTo, get, listVal, objectVal, orderByChild, query, ref, remove, update } from '@angular/fire/database';
import { map, Observable, iif, switchMap, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MonitorService {
    readonly dbRef: DatabaseReference;

  constructor(private readonly dbs: Database) {
    this.dbRef = ref(dbs);
  }
  
    saveUser(monitor: Monitor): Promise<void> {
      const saveValue: any = {};
      saveValue[`monitor/${monitor.brand_id}`] = monitor;
      return update(this.dbRef, saveValue);
    }
  
    findIdByUser(id: string) {
      return get(child(this.dbRef, `monitor/${id}`))
        .then(snapshot => {
          const val = snapshot.val();
          if (val) {
            return { id, ...val }
          }
          return val;
        });
    }
  
    deleteById(id: string) {
      return remove(child(this.dbRef, `monitor/${id}`));
    }
  
    fetchAllUser() {
      return objectVal<Monitor>(child(this.dbRef, 'monitor')).pipe(this.convertToUserResponse$);
    }
  
    searchByName(name: string) {
      return name ?
        listVal<Monitor>(
          query(child(this.dbRef, 'monitor'), orderByChild('name'), equalTo(name))
          ).pipe(this.convertToUserResponse$) : this.fetchAllUser();
    }
  
    private convertToUserResponse$(input$: Observable<any>): Observable<Array<Monitor>> {
      return input$.pipe(
        switchMap(resp => iif(() => !!resp, of(resp), of({}))),
        map(resp => Object.keys(resp).map(key => ({ ...resp[key], id: key, })))
      );
    }
}