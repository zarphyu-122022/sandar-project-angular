import { Injectable } from '@angular/core';
import { child, Database, DatabaseReference, equalTo, get, listVal, objectVal, orderByChild, query, ref, remove, update } from '@angular/fire/database';
import { map, Observable, iif, switchMap, of } from 'rxjs';
import { FeedBack } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  readonly dbRef: DatabaseReference;

  constructor(private readonly dbs: Database) {
    this.dbRef = ref(dbs);
  }
  
    
  saveUser(feedback: FeedBack): Promise<void> {
    const saveValue: any = {};
    saveValue[`feedback/${feedback.feedId}`] = feedback;
    return update(this.dbRef, saveValue);
  }

  findIdByUser(id: string) {
    return get(child(this.dbRef, `feedback/${id}`))
      .then(snapshot => {
        const val = snapshot.val();
        if (val) {
          return { id, ...val }
        }
        return val;
      });
  }

  deleteById(id: string) {
    return remove(child(this.dbRef, `feedback/${id}`));
  }

  fetchAllUser() {
    return objectVal<FeedBack>(child(this.dbRef, 'feedback')).pipe(this.convertToUserResponse$);
  }

  searchByName(name: string) {
    return name ?
      listVal<FeedBack>(
        query(child(this.dbRef, 'feedback'), orderByChild('name'), equalTo(name))
        ).pipe(this.convertToUserResponse$) : this.fetchAllUser();
  }

  private convertToUserResponse$(input$: Observable<any>): Observable<Array<FeedBack>> {
    return input$.pipe(
      switchMap(resp => iif(() => !!resp, of(resp), of({}))),
      map(resp => Object.keys(resp).map(key => ({ ...resp[key], id: key, })))
    );
  }


  // private feedback : FeedBack[] =[]
  // constructor() { }

  // save(feedback:any){
  //   this.feedback.push(feedback)
  //   console.log(feedback)
  // }

  // getFeedback(){
  //   return this.feedback;
  // }
}
