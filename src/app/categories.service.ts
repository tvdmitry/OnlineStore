import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateResponse, ICategory } from 'src/interface';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private http: HttpClient) {}

  public create(category: ICategory): Observable<ICategory> {
    return this.http
      .post(`${environment.url}category`, category, {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('accessToken'),
        }),
      })
      .pipe(
        map((response: CreateResponse) => {
          return {
            ...category,
            name: response.name,
            id: response.name,
          };
        })
      );
  }

  public getAll(): Observable<ICategory[]> {
    return this.http
      .get<ICategory[]>(`${environment.url}category`, {
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

  public getById(id: string): Observable<ICategory> {
    return this.http
      .get<ICategory>(`${environment.url}category/${id}`, {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('accessToken'),
        }),
      })
      .pipe(
        map((category: ICategory) => {
          return {
            ...category,
          };
        })
      );
  }

  public update(category: ICategory): Observable<ICategory> {
    return this.http.patch<ICategory>(
      `${environment.url}category/${category.id}`,
      category,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('accessToken'),
        }),
      }
    );
  }

  public remove(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.url}category/${id}`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('accessToken'),
      }),
    });
  }
}
