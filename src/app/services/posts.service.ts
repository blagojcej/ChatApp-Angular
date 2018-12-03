import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BASEURL = "http://localhost:3000/api/chatapp";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  addPost(body): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-post`, body);
  }

  getAppPosts() {
    return this.http.get<{ message: string, posts: any }>(`${BASEURL}/posts`);
  }
}
