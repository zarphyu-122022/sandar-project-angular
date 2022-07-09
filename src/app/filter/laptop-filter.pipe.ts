import { Pipe, PipeTransform } from '@angular/core';
import { Laptop } from '../models/laptop.model';

@Pipe({
  name: 'laptopFilter',
  pure: false
})
export class LaptopFilterPipe implements PipeTransform {
  transform(laptop:any[],brand_name:string):Laptop[] {
      if(!laptop || !brand_name)
        return laptop;
      return laptop.filter(l =>l.brand_name.toUpperCase().includes(brand_name.toUpperCase()))
  }
  
    //   return laptop.filter(l =>l.brand_name.toUpperCase().includes(brand_name.toUpperCase()))
//   transform(value: any[], brand_name: string,prop:string): any[] {
//     const result:any=[];
//     if (!value || brand_name==='' || prop==='') {
//       return value;
//     }

//     value.forEach((a:any)=>{
//       if(a[brand_name].trim().toLowerCase().includes(brand_name.toLowerCase())){
//         result.push(a)
//       }

//     });
//     return result;
// }
}



  // transform(laptop:Laptop[],brand_name:string):Laptop[] {
  //   if(!laptop || !brand_name)
  //     return laptop;

  //   return laptop.filter(l =>l.brand_name.toUpperCase().includes(brand_name.toUpperCase()))

  //   // return value.filter(  (laptop:any)   =>  laptop.brand_name.toLowerCase().includes(brand_name.toLowerCase))



  // }


