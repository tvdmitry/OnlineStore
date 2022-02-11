import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CardComponent implements OnInit {
  private index: number;
  public textDelete!: string;
  public textAboutClear!: string;
  private stat: string = 'delete';
  private clear: string = 'clear';
  private popupOne!: Subscription;
  private popupTwo!: Subscription;
  @Input() private delayOne: number = 500;

  constructor(private http: HttpClient, public cartService: CartService) {}

  ngOnInit(): void {
    this.popupOne = this.cartService.delete$.subscribe((delet) => {
      this.stat = delet.stat;
      this.textDelete = delet.textDelete;
      const timeoutOne = setTimeout(() => {
        clearTimeout(timeoutOne);
        this.textDelete = '';
      }, this.delayOne);
    });

    this.popupOne = this.cartService.clear$.subscribe((res) => {
      this.clear = res.clear;
      this.textAboutClear = res.textAboutClear;
      const timeoutOne = setTimeout(() => {
        clearTimeout(timeoutOne);
        this.textAboutClear = '';
      }, this.delayOne);
    });

    this.cartService.calcGrandTotal(this.cartService.cart);
  }

  ngOnDestroy() {
    if (this.popupOne) {
      this.popupOne.unsubscribe();
    }
  }

  private removeClass() {
    this.cartService.removeClass();
  }

  private clearCartModal() {
    this.cartService.clearCartModal();
  }

  private deleteCartItem(id: number) {
    this.cartService.removeFromLocalStorage(id);
    this.index = this.cartService.cart.findIndex((x) => x.id === String(id));
    this.cartService.cart.splice(this.index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartService.cart));
  }

  private clearCart() {
    this.cartService.clearCart();
  }
}
