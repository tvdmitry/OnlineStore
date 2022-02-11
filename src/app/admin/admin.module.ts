import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-category/create-page.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './shared/components/search.pipe';
import { SharedCategoryComponent } from './shared/components/shared-category/shared-category.component';
import { SharedProductsComponent } from './shared/components/shared-products/shared-products.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { SharedOrderComponent } from './shared/components/shared-order/shared-order.component';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import { SharedModule } from '../shared/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'dashboard', component: DashboardPageComponent },
          { path: 'shared-category', component: SharedCategoryComponent },
          { path: 'shared-products', component: SharedProductsComponent },
          { path: 'shared-order', component: SharedOrderComponent },
          {
            path: 'categories/:categoryId/edit',
            component: EditCategoryComponent,
          },
          { path: 'products/:id/edit', component: EditProductsComponent },
          { path: 'orders/:id/edit', component: EditOrdersComponent },
          { path: 'create-category', component: CreatePageComponent },
          { path: 'create-products', component: CreateProductsComponent },
        ],
      },
    ]),
  ],

  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditCategoryComponent,
    SearchPipe,
    SharedCategoryComponent,
    SharedProductsComponent,
    CreateProductsComponent,
    EditProductsComponent,
    SharedOrderComponent,
    EditOrdersComponent,
  ],
  providers: [],
})
export class AdminModule {}
