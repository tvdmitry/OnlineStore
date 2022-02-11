import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IClient, IOrder, IProduct } from 'src/interface';
import { CartService } from './cart.service';
import { OrdersService } from './orders.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private cart: IProduct[] = this.cartService.cart;
  private orders$!: Observable<IOrder[]>;

  constructor(
    private http: HttpClient,
    public cartService: CartService,
    public ordersService: OrdersService
  ) {}

  private create(client: IClient): Observable<IClient> {
    return this.http.post(`${environment.url}client`, client).pipe(
      map((response: any) => {
        return {
          ...client,
          firstName: response.firstName,
          lastName: response.lastName,
          address: response.address,
          phone: response.phone,
        };
      })
    );
  }

  public createOrder(client) {
    return this.http.post(`${environment.url}orders`, {
      products: this.cartService.cart,
      client: client,
    });
  }

  public getById(id: string): Observable<IOrder> {
    return this.http
      .get<IOrder>(`${environment.url}orders/${id}`, {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('accessToken'),
        }),
      })
      .pipe(
        map((order: IOrder) => {
          return {
            ...order,
          };
        })
      );
  }

  public getAll(): any {
    return this.http
      .get(`${environment.url}orders`, {
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

  public removeOrder(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.url}orders/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('accessToken'),
      }),
    });
  }
}
