import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private baseUrl ='http://localhost:3000/users'
  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<any>(this.baseUrl);
  }

   get(id: number): Observable<User> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(user: User): Observable<User | any> {
    return this.http.post(this.baseUrl, user);
  }

  update(id: number, user: User): Observable<User | any> {
    return this.http.patch(`${this.baseUrl}/${id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
