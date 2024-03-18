import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
 
 constructor( private _WishlistService:WishlistService , private _ToastrService:ToastrService , private _CartService:CartService){} 

 products:Product[] = []

 wishListData:string[] = []



 ngOnInit(): void {
      
  this._WishlistService.getWishList().subscribe({
    
    next:(response)=>{
       
      console.log(response);

      this.products = response.data

      
      const newData = response.data.map(     (item:any)=> item._id    )

      this.wishListData = newData
      

    }


  })

 }




 
 addFav(prodId:string):void
  
 {

  this._WishlistService.addToWishList(prodId).subscribe({

   next:(response)=>{
       
     console.log(response);

     this._ToastrService.success(response.message)

     this.wishListData = response.data

     
     


   }

  })


 }


 removeFav(prodId:string):void{
  
   this._WishlistService.removeWishList(prodId).subscribe({
    

     next:(response)=>{

          console.log(response);

          this._ToastrService.success(response.message)

          this.wishListData = response.data

          const newProductsData = this.products.filter(   (item)=> this.wishListData.includes(item._id)  )

          
        this.products = newProductsData          

          
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
