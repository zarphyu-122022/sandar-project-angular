import { Laptop } from 'src/app/models/laptop.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { LaptopServiceService } from './laptop-service.service';

@Injectable({
    providedIn: 'root'
})

export class PostService {
    constructor(private http: HttpClient,private lapropService :LaptopServiceService) { }

    createAndstorePost(laptop: Laptop[]) {
        this.http.
            post('https://final-project-angular-ecbc8-default-rtdb.firebaseio.com/posts.json',
                laptop)
            .subscribe(response => {
                console.log(response)
            }
            )


    }

    fetchPost() {
        return this.http.get<{ [key: string]: Laptop }>('https://final-project-angular-ecbc8-default-rtdb.firebaseio.com/posts.json')
            .pipe(
                map(response => {
                    const postArray: Laptop[] = [];
                    for (const key in response) {
                        if (response.hasOwnProperty(key)) {
                            postArray.push({ ...response[key], brand_id: key });
                        }
                    }
                    return postArray

                }
                )
            )

    }

    // findById(brand_id:number){
    //     return this._laptop.find(laptop => laptop.brand_id === brand_id);
    //   }

    edit(id:number,laptop :Laptop){
        this.http.put<{laptop :Laptop}>('https://final-project-angular-ecbc8-default-rtdb.firebaseio.com/posts/'+id+'.json',laptop).subscribe(
            res =>{
                console.log(res)
            }
        )
    //console.log('https://final-project-angular-ecbc8-default-rtdb.firebaseio.com/posts/'+id+'.json')
        

    }

    // deletePost(){
    //     return this.http.delete('https://final-project-angular-ecbc8-default-rtdb.firebaseio.com/posts.json')
    // }


}