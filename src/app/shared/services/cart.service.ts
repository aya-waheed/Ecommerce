import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }


  userOrders:any = jwtDecode(localStorage.getItem('eToken') ! )
  


  addToCart(productId:string):Observable<any>{

      return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart' , 
       
      {

        productId: productId
      } 
      
      )

  }


getUserCart():Observable<any>{
  

    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)

  }



  removeItem(productId:string):Observable<any>{

  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` 
  
  )

  }


  
  clearCart():Observable<any>{

    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` 
    
    )
  
    }


  updateCartProduct(idProduct:string , newCount:number):Observable<any>{
   
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${idProduct}` , 
    
       
    {
      count: newCount
     } 



    
    )



  }


  checkOut(cartId:string , userData:object):Observable<any>{

   return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://aya-waheed.github.io/Ecommerce` , 
   
   {
    shippingAddress: userData
        
    }
   
   )

  }


  getUserOrders():Observable<any>{

 return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${this.userOrders.id}`)



  }






}
