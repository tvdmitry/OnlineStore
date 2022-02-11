import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/products.service';
import { environment } from 'src/environments/environment';
import { ICategory, IProduct } from 'src/interface';
import { AuthService } from '../shared/components/services/auth.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss'],
})
export class EditProductsComponent implements OnInit {
  public form!: FormGroup;
  private product!: IProduct;
  private submited: boolean = false;
  private uSub!: Subscription;
  private categories: ICategory[] = [];
  private textEditProduct!: string;
  private productUpdate: string = 'productUpdate';
  private popupOne!: Subscription;
  @Input() private delayOne: number = 2000;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.popupOne = this.auth.updateProduct$.subscribe((res) => {
      this.productUpdate = res.productUpdate;
      this.textEditProduct = res.textEditProduct;

      const timeoutOne = setTimeout(() => {
        clearTimeout(timeoutOne);
        this.textEditProduct = '';
      }, this.delayOne);
    });

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.productsService.getById(params.id);
        })
      )
      .subscribe((product: IProduct) => {
        this.product = product;
        this.form = new FormGroup({
          name: new FormControl(product.name, Validators.required),
          price: new FormControl(product.price, Validators.required),
          description: new FormControl(
            product.description,
            Validators.required
          ),
          amount: new FormControl(product.amount, Validators.required),
        });
      });

    this.http
      .get<ICategory[]>(`${environment.url}category`)
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  private submit() {
    if (this.form.invalid) {
      return;
    }

    this.submited = true;

    this.uSub = this.productsService
      .update({
        ...this.product,
        name: this.form.value.name,
        price: this.form.value.price,
        description: this.form.value.description,
        amount: this.form.value.amount,
      })
      .subscribe(() => {
        this.submited = false;
      });
  }

  private name() {
    return this.form.controls['name'];
  }

  private price() {
    return this.form.controls['price'];
  }

  private description() {
    return this.form.controls['description'];
  }

  private amount() {
    return this.form.controls['amount'];
  }

  private updateProducts() {
    this.auth.updateToProducts();
  }
}
