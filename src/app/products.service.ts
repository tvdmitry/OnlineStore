import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct } from 'src/interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private param: Params;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  public create(products: IProduct): Observable<IProduct> {
    return this.http
      .post(`${environment.url}products`, products, {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('accessToken'),
        }),
      })
      .pipe(
        map((response: any) => {
          return {
            ...products,
            name: response.name,
            price: response.name,
            description: response.name,
            amount: response.amount,
          };
        })
      );
  }

  public remove(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.url}products/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('accessToken'),
      }),
    });
  }

  public getAll(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(`${environment.url}products`, {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('accessToken'),
        }),
      })
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response).map((key) => ({
            ...response[key],
          }));
        })
      );
  }

  public getById(id: string): Observable<IProduct> {
    return this.http
      .get<IProduct>(`${environment.url}products/${id}`, {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('accessToken'),
        }),
      })
      .pipe(
        map((product: IProduct) => {
          return {
            ...product,
          };
        })
      );
  }

  public update(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(
      `${environment.url}products/${product.id}`,
      product,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('accessToken'),
        }),
      }
    );
  }
}
