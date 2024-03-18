import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   
  constructor( private _EcomdataService:EcomdataService , private _CartService:CartService , private _ToastrService:ToastrService ){}

  products:Product[] = []

    
  ngOnInit(): void {


    this._EcomdataService.getAllProducts().subscribe({
     
      next:(response)=> {
       
      // this.products = response.data
      console.log(response);
      
      this.products = response.data
        


      }

    })
      
  }

  
addCart(id:string):void{

  this._CartService.addToCart(id).subscribe({
  
   next:(response)=> {
          
     console.log(response);
 
     this._ToastrService.success(response.message , 'Fresh Cart')
     
 
   } , 
 
   error:(err)=>{
   
     console.log(err);
     
 
 
   }
 
 
  })
 
 
 }


}
