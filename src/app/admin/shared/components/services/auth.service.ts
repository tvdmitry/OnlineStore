import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAuthResponse, IUser } from 'src/interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public textErrorPassword: string = '';
  public textErrorEmail: string = '';
  public err$: Subject<string> = new Subject<string>();
  public alert$: Subject<any> = new Subject<any>();
  public update$: Subject<any> = new Subject<any>();
  public create$: Subject<any> = new Subject<any>();
  public updateProduct$: Subject<any> = new Subject<any>();
  public categoryDelete$: Subject<any> = new Subject<any>();
  public productDelete$: Subject<any> = new Subject<any>();
  public orderDelete$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {}

  private get token(): string {
    return localStorage.getItem('accessToken');
  }

  public login(user: IUser): Observable<any> {
    return this.http.post('http://localhost:3001/signin', user).pipe(
      tap(this.setAccessToken),
      catchError((error: HttpErrorResponse): any => {
        if (error.error === 'Incorrect password') {
          this.textErrorPassword = 'Введен неверный пароль';
        } else {
          this.textErrorPassword = '';
        }

        if (error.error === 'Cannot find user') {
          this.textErrorEmail = 'Введен неверный email';
        } else {
          this.textErrorEmail = '';
        }
        return throwError(error);
      })
    );
  }

  public logout() {
    this.setAccessToken(null);
  }

  private isAuthenticated(): boolean {
    return !!this.token;
  }

  private setAccessToken(response: IAuthResponse | null) {
    if (response) {
      localStorage!.setItem('accessToken', response.accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }

  private success(text: string) {
    this.alert$.next({ type: 'success', text });
  }

  private update(textAlert: string) {
    this.update$.next({ type: 'update', textAlert });
  }

  private create(textProduct: string) {
    this.create$.next({ create: 'create', textProduct });
  }

  private updateToProduct(textEditProduct: string) {
    this.updateProduct$.next({
      productUpdate: 'productUpdate',
      textEditProduct,
    });
  }

  private removeItem(textDeleteCategory: string) {
    this.categoryDelete$.next({
      categoryDelete: 'categoryDelete',
      textDeleteCategory,
    });
  }

  private removeItemProduct(textDeleteProduct: string) {
    this.productDelete$.next({
      productDelete: 'productDelete',
      textDeleteProduct,
    });
  }

  private deleteItemProduct(textDeleteOrder: string) {
    this.orderDelete$.next({ orderDelete: 'orderDelete', textDeleteOrder });
  }

  public createCategoryModal() {
    this.success('Категория создана');
  }

  public updateCategory() {
    this.update('Категория обновлена');
  }

  public createProductModal() {
    this.create('Товар создан');
  }

  public updateToProducts() {
    this.updateToProduct('Товар обновлен');
  }

  public removeCategory() {
    this.removeItem('Категория удалена');
  }

  public removeProduct() {
    this.removeItemProduct('Товар удален');
  }

  public removeItemOrder() {
    this.deleteItemProduct('Заказ удален');
  }
}
