import { Desktop } from './../models/desktop.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { LaptopServiceService } from './laptop-service.service';

@Injectable({
    providedIn: 'root'
})

export class DesktopService {
    constructor(private http: HttpClient,private lapropService :LaptopServiceService) { }

    createAndstorePost(laptop: Desktop[]) {
        this.http.
            post('https://desktop-57906-default-rtdb.firebaseio.com/posts.json',
                laptop)
            .subscribe(response => {
                console.log(response)
            }
            )


    }

    fetchPost() {
        return this.http.get<{ [key: string]: Desktop }>('https://desktop-57906-default-rtdb.firebaseio.com/posts.json')
            .pipe(
                map(response => {
                    const postArray: Desktop[] = [];
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

    // deletePost(){
    //     return this.http.delete('https://final-project-angular-ecbc8-default-rtdb.firebaseio.com/posts.json')
    // }


}