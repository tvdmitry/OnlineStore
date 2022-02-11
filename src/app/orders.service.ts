import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateResponse, IOrder, IProduct } from 'src/interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private orders: IOrder[] = [];

  constructor(private http: HttpClient) {}

  private create(order: any): Observable<any> {
    return this.http.post(`${environment.url}orders`, order).pipe(
      map((response: CreateResponse) => {
        return {
          ...order,
          name: response.name,
          price: response.name,
          description: response.name,
          id: response.name,
          categoryId: response.name,
          img: response.name,
          pieces: response.name,
          Id: response.name,
        };
      })
    );
  }

  private increase(product) {
    product.amount++;
  }

  private decrease(product) {
    if (product.amount > 0) {
      product.amount--;
    }
  }

  private remove(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.url}client/${id}`);
  }

  private getById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.url}products/${id}`).pipe(
      map((product: IProduct) => {
        return {
          ...product,
        };
      })
    );
  }

  private update(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(
      `${environment.url}products/${product.id}`,
      product
    );
  }

  public getAll(): any {
    return this.http.get(`${environment.url}orders`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
        }));
      })
    );
  }
}
