import { Pipe, PipeTransform } from '@angular/core';
import { Laptop } from '../models/laptop.model';

@Pipe({
  name: 'laptopFilter',
  pure: false
})
export class LaptopFilterPipe implements PipeTransform {
  transform(laptop: Laptop[], brand_name: string): any[] {
    if (!laptop || !brand_name) {
      return laptop;
    }

    return laptop.filter(it => {
      return it.brand_id.toLowerCase().includes(brand_name.toLowerCase);
    });
  }
}



  // transform(laptop:Laptop[],brand_name:string):Laptop[] {
  //   if(!laptop || !brand_name)
  //     return laptop;

  //   return laptop.filter(l =>l.brand_name.toUpperCase().includes(brand_name.toUpperCase()))

  //   // return value.filter(  (laptop:any)   =>  laptop.brand_name.toLowerCase().includes(brand_name.toLowerCase))



  // }


