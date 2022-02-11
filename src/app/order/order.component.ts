import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClient } from 'src/interface';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
    });
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }

    const client: IClient = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      address: this.form.value.address,
      phone: this.form.value.phone,
    };

    sessionStorage.setItem('submited', JSON.stringify(true));

    this.orderService.createOrder(client).subscribe(() => {
      this.form.reset();
    });

    localStorage.removeItem('cart');
    this.cartService.cart = [];
  }

  public firstName() {
    return this.form.controls['firstName'];
  }

  public lastName() {
    return this.form.controls['lastName'];
  }

  public address() {
    return this.form.controls['address'];
  }

  public phone() {
    return this.form.controls['phone'];
  }
}
