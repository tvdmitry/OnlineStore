import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/cart.service';
import { OrderService } from 'src/app/order.service';
import { OrdersService } from 'src/app/orders.service';
import { IOrder, IProduct } from 'src/interface';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.scss'],
})
export class EditOrdersComponent implements OnInit {
  private orders: IOrder;
  public products: IProduct[] = [];
  public form!: FormGroup;
  private total: number;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.orderService.getById(params.id);
        })
      )
      .subscribe((orders: any) => {
        this.orders = orders;
        this.products = this.orders.products;
        this.calcTotal(this.products);
      });
  }

  private calcTotal(products) {
    this.total = products.reduce((sum, item) => {
      return sum + item.amount * item.price;
    }, 0);
  }
}
