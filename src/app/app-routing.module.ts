import { authGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

const routes: Routes = [


  {path:'' , component:AuthLayoutComponent , children:[

    {path:'' , redirectTo:'register' , pathMatch:'full'  },

    {path:'login' , component:LoginComponent , title:'login'} , 

    {path:'register' , component:RegisterComponent , title:'register'} ,

    { path:'forgot' , component:ForgotpasswordComponent , title:'forgot' }

  ]} ,
 
  {path:'' ,

  canActivate :[authGuard] ,
  
  component:BlankLayoutComponent , children : [

    {path:'' , redirectTo:'home' , pathMatch:'full' },
  
    {path:'home' , component:HomeComponent , title:'home'},

    {path:'cart' , component:CartComponent , title:'cart'} ,

    { path:'wishlist' , component:WishlistComponent , title:'wishlist' } ,

    {path:'products' , component:ProductsComponent , title:'products'},

    {path:'allorders' , component:AllordersComponent , title:'all orders'} ,
    
    {path:'checkout/:id' , component:CheckoutComponent , title:'checkOut'} ,

    {path:'details/:id' , component:DetailsComponent , title:'details'},

    {path:'categories' , component:CategoriesComponent , title:'categories'} , 

    {path:'brands' , component:BrandsComponent , title:'brands'} ,

    { path:'forgotpassword' , component:ForgotpasswordComponent , title:'forgot password' }


  ]} ,

  

  {path:'**' , component:NotfoundComponent ,  title:'NotFound'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
