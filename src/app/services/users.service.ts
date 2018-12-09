import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  GetAllUsers(): Observable<any> {
    return this.http.get(`${BASEURL}/users`);
  }

  // When we use like this, we're using then methon instead of subscribing it
  // async GetAllUsers() {
  //   return await this.http.get(`${BASEURL}/users`);
  // }
}
