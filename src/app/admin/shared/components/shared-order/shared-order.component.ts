import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart.service';
import { OrderService } from 'src/app/order.service';
import { OrdersService } from 'src/app/orders.service';
import { IOrder } from 'src/interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shared-order',
  templateUrl: './shared-order.component.html',
  styleUrls: ['./shared-order.component.scss'],
})
export class SharedOrderComponent implements OnInit {
  public orders: IOrder[] = [];
  private dSub?: Subscription;
  private pSub?: Subscription;
  public textDeleteOrder!: string;
  private orderDelete: string = 'orderDelete';
  private popupOne!: Subscription;
  @Input() private delayOne: number = 2000;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private orderService: OrderService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.pSub = this.orderService.getAll().subscribe((orders) => {
      this.orders = orders;
    });

    this.popupOne = this.auth.orderDelete$.subscribe((res) => {
      this.orderDelete = res.orderDelete;
      this.textDeleteOrder = res.textDeleteOrder;

      const timeoutOne = setTimeout(() => {
        clearTimeout(timeoutOne);
        this.textDeleteOrder = '';
      }, this.delayOne);
    });
  }

  private remove(id: string | undefined) {
    this.dSub = this.orderService.removeOrder(id).subscribe(() => {
      this.orders = this.orders.filter((order) => order.id !== id);
    });
  }

  private removeItemOrder() {
    this.auth.removeItemOrder();
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
