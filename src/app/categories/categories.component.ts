import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory, IProduct } from 'src/interface';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories: ICategory[] = [];
  public products: IProduct[] = [];
  private param: Params;
  private pieces: number;
  public text!: string;
  public textAlert!: string;
  private state: string = 'toggle';
  private popupTwo!: Subscription;
  @Input() private delayTwo: number = 500;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.popupTwo = this.cartService.toggle$.subscribe((toggle) => {
      this.state = toggle.state;
      this.textAlert = toggle.textAlert;
      const timeoutTwo = setTimeout(() => {
        clearTimeout(timeoutTwo);
        this.textAlert = '';
      }, this.delayTwo);
    });

    this.http
      .get<ICategory[]>(`${environment.url}category`)
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.route.params.subscribe((params: Params) => {
      this.param = params;

      this.http
        .get<IProduct[]>(
          `${environment.url}products?categoryId=${this.param.categoryId}`
        )
        .subscribe((products) => {
          this.products = products;
        });
    });

    this.cartService.cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }

  ngOnDestroy() {
    if (this.popupTwo) {
      this.popupTwo.unsubscribe();
    }
  }

  private addClass() {
    this.cartService.addClass();
  }

  private addToCart(product) {
    this.cartService.addToCart(product);
  }

  private submit() {
    sessionStorage.setItem('submited', JSON.stringify(false));
  }
}
