import {Laptop} from "./laptop.model"
export class Order{
    id!:number;
    item!:Laptop[];
    totalPrice!:number;
    name!:string;
    
}