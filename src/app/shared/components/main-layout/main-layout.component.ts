import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart.service';
import { environment } from 'src/environments/environment';
import { ICategory, IProduct } from 'src/interface';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  private aSub: Subscription;
  private products: IProduct[] = [];
  public categoryId: string;
  private categories: ICategory[] = [];
  private text!: string;
  @Input() private delay: number = 2000;

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<ICategory[]>(`${environment.url}category`)
      .subscribe((categories) => {
        this.categories = categories;

        for (let obj of this.categories) {
          this.categoryId = obj.id;
        }
      });

    this.http
      .get<IProduct[]>(`${environment.url}products`)
      .subscribe((products) => {
        this.products = products;
      });
  }
}
