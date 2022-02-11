import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/products.service';
import { IProduct } from 'src/interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shared-products',
  templateUrl: './shared-products.component.html',
  styleUrls: ['./shared-products.component.scss'],
})
export class SharedProductsComponent implements OnInit {
  public products: IProduct[] = [];
  private dSub?: Subscription;
  private pSub?: Subscription;
  private textDeleteProduct!: string;
  private productDelete: string = 'productDelete';
  private popupOne!: Subscription;
  @Input() private delayOne: number = 2000;

  constructor(
    private productService: ProductsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.pSub = this.productService.getAll().subscribe((products) => {
      this.products = products;
    });

    this.popupOne = this.auth.productDelete$.subscribe((res) => {
      this.productDelete = res.productDelete;
      this.textDeleteProduct = res.textDeleteProduct;
      const timeoutOne = setTimeout(() => {
        clearTimeout(timeoutOne);
        this.textDeleteProduct = '';
      }, this.delayOne);
    });
  }

  private remove(id: string | undefined) {
    this.dSub = this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }

  private removeProduct() {
    this.auth.removeProduct();
  }
}
