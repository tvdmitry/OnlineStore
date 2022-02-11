import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/interface';
import { CartService } from '../cart.service';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss'],
})
export class MyOrderComponent implements OnInit {
  public submited: boolean;
  public pSub?: Subscription;
  public orders: IOrder[] = [];

  constructor(
    public cartService: CartService,
    public ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.pSub = this.ordersService.getAll().subscribe((orders) => {
      this.orders = orders;
    });

    this.submited =
      sessionStorage.getItem('submited') === 'true'
        ? Boolean(sessionStorage.getItem('submited'))
        : false;
  }
}
