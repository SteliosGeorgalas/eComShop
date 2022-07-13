import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AuthRouteGuardService } from './auth-route-guard.service';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "cart", component: CartComponent },
  { path: "products", component: ProductsComponent },
  { path: "login", component: LoginComponent },
  { path: "order-success", component: OrderSuccessComponent, canActivate: [AuthRouteGuardService] },
  { path: "admin/products", component: AdminProductsComponent, canActivate: [AuthRouteGuardService] },
  { path: "admin/orders", component: AdminOrdersComponent, canActivate: [AuthRouteGuardService] },
  { path: "check-out", component: CheckOutComponent, canActivate: [AuthRouteGuardService] },
  { path: "my/orders", component: MyOrdersComponent, canActivate: [AuthRouteGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
