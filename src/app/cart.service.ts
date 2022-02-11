import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from 'src/interface';

export type AlertType = 'success' | 'warning' | 'danger';
export type ToggleType = 'togl' | 'toggle';
export type DeleteType = 'delete';
export type ClearType = 'clear';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: IProduct[] = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
  private basket: IProduct[];
  private index: number;
  private totalPrice: number;
  private type: AlertType;
  private state: ToggleType;
  private stat: DeleteType;
  private clearToCart: ClearType;
  private text: string;
  private textAlert: string;
  public alert$ = new Subject<any>();
  public toggle$ = new Subject<any>();
  public delete$ = new Subject<any>();
  public clear$ = new Subject<any>();
  public amount: any;

  private success(text: string) {
    this.alert$.next({ type: 'success', text });
  }

  private warning(text: string) {
    this.alert$.next({ type: 'warning', text });
  }

  private danger(text: string) {
    this.alert$.next({ type: 'danger', text });
  }

  private toggle(textAlert: string) {
    this.toggle$.next({ state: 'toggle', textAlert });
  }

  private delete(textDelete: string) {
    this.delete$.next({ stat: 'delete', textDelete });
  }

  private clear(textAboutClear: string) {
    this.clear$.next({ clearToCart: 'clear', textAboutClear });
  }

  public addToCart(product) {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public addClass() {
    this.toggle('Товар добавлен в корзину');
  }

  public removeClass() {
    this.delete('Товар удален');
  }

  public clearCartModal() {
    this.delete('Корзина очищена');
  }

  public removeFromLocalStorage(id) {
    this.basket = JSON.parse(localStorage.getItem('cart'));
    this.index = this.cart.findIndex((x) => x.id == id);
    this.basket.splice(this.index, 1);
    localStorage.setItem('cart', JSON.stringify(this.basket));
  }

  public clearCart() {
    localStorage.clear();
    return (this.cart = []);
  }

  private increase(product) {
    if (product.amount > 0) {
      product.amount++;
    }
  }

  private decrease(product) {
    if (product.amount > 1) {
      product.amount--;
    }
  }

  public calcGrandTotal(data) {
    this.totalPrice = data.reduce((sum, item) => {
      return sum + item.amount * item.price;
    }, 0);
  }

  private calcClear() {
    this.totalPrice = 0;
  }

  private calcClearItem(cart) {
    this.totalPrice = this.totalPrice - cart.price * cart.amount;
  }
}
