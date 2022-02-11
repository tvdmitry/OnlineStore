import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CardComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { CompletedOrderComponent } from './completed-order/completed-order.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderComponent } from './order/order.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'categories/:categoryId', component: CategoriesComponent },
      { path: '', component: CategoriesComponent },
      { path: 'card', component: CardComponent },
      { path: 'order', component: OrderComponent },
      { path: 'order-status', component: OrderStatusComponent },
      { path: 'my-order', component: MyOrderComponent },
      { path: 'orders/:id/completed', component: CompletedOrderComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
