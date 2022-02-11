import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/products.service';
import { environment } from 'src/environments/environment';
import { ICategory, IProduct } from 'src/interface';
import { AuthService } from '../shared/components/services/auth.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss'],
})
export class CreateProductsComponent implements OnInit {
  public form!: FormGroup;
  public categories: ICategory[] = [];
  public url: string | ArrayBuffer;
  private selectedCategory: string = '1';
  private popupOne!: Subscription;
  public textProduct!: string;
  public create: string = 'create';
  @Input() private delayOne: number = 2000;

  constructor(
    private productsService: ProductsService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.popupOne = this.auth.create$.subscribe((res) => {
      this.textProduct = res.textProduct;
      this.create = res.create;

      const timeoutOne = setTimeout(() => {
        clearTimeout(timeoutOne);
        this.textProduct = '';
      }, this.delayOne);
    });

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      amount: new FormControl(1, Validators.required),
      img: new FormControl(null, Validators.required),
    });

    this.http
      .get<ICategory[]>(`${environment.url}category`)
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }

    const products: IProduct = {
      name: this.form.value.name,
      price: this.form.value.price,
      description: this.form.value.description,
      amount: this.form.value.amount,
      categoryId: this.selectedCategory,
      img: this.url,
    };

    this.productsService.create(products).subscribe((res) => {
      amount: res.amount;
      categoryId: res.categoryId;
      description: res.description;
      img: res.img;
      name: res.name;
      price: res.price;
      description: res.description;
    });
  }

  public name() {
    return this.form.controls['name'];
  }

  public price() {
    return this.form.controls['price'];
  }

  public description() {
    return this.form.controls['description'];
  }

  public amount() {
    return this.form.controls['amount'];
  }

  public img() {
    return this.form.controls['img'];
  }

  public selectChangeHandler(event: any) {
    this.selectedCategory = event.target.value;
  }

  public onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target.result;
      };
    }
  }

  public createProductModal() {
    this.auth.createProductModal();
  }
}
