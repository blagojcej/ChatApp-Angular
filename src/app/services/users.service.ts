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

  GetUserById(id): Observable<any> {
    return this.http.get(`${BASEURL}/user/${id}`);
  }

  GetUserByName(username): Observable<any> {
    return this.http.get(`${BASEURL}/username/${username}`);
  }

  // When we use like this, we're using then methon instead of subscribing it
  // async GetAllUsers() {
  //   return await this.http.get(`${BASEURL}/users`);
  // }

  FollowUser(userFollowed): Observable<any> {
    return this.http.post(`${BASEURL}/follow-user`, { userFollowed: userFollowed });
  }

  UnFollowUser(userFollowed): Observable<any> {
    return this.http.post(`${BASEURL}/unfollow-user`, { userFollowed: userFollowed });
  }

  // ? means optional parameter
  MarkNotification(id, deleteVal?): Observable<any> {
    return this.http.post(`${BASEURL}/mark/${id}`, { id, deleteVal });
  }

  markAllAsRead(): Observable<any> {
    return this.http.post(`${BASEURL}/mark-all`, {
      all: true
    });
  }
}
