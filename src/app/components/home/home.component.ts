import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _EcomdataService:EcomdataService , private _CartService : CartService , private _ToastrService:ToastrService ,

    private _WishlistService:WishlistService
     

    
    ){}

  products:Product[] = []

  categories:any[] = []

  wishListData:string[] = []


  searchTerm:string = ''


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


  categorySliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    
    autoplay:true ,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    
  }


  
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true ,
    items:1,
    
  }





  ngOnInit(): void {

    this._EcomdataService.getAllProducts().subscribe({
     
      next:(response)=> {
       
      this.products = response.data
        


      }

    })

    this._EcomdataService.getCategories().subscribe({
    
      next:(response)=>{

               this.categories = response.data;
               

      }


    })


    this._WishlistService.getWishList().subscribe({
      
      next:(response)=>{

       console.log('wishlist' , response.data);

       const newData = response.data.map(     (item:any)=> item._id    )


       console.log('newData' , newData);

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
           

      }


    })


  }



}
