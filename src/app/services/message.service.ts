import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASEURL='http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(senderId, receiverId, receiverName, message) : Observable<any> {
    return this.http.post(`${BASEURL}/chat-messages/${senderId}/${receiverId}`, {
      receiverId,
      receiverName,
      message
    });
  }
}
