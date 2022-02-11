import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IOrder, IProduct } from 'src/interface';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-completed-order',
  templateUrl: './completed-order.component.html',
  styleUrls: ['./completed-order.component.scss'],
})
export class CompletedOrderComponent implements OnInit {
  public orders: IOrder;
  public products: IProduct[] = [];
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
