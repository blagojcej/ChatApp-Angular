import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit {

  receiver: string;
  user: any;
  message: string;
  receiverData: any;
  messagesArray = [];
  socket: any;

  constructor(
    private tokenService: TokenService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.route.params
      .subscribe(params => {
        // console.log(params);
        this.receiver = params.name;
        this.GetUserByUsername(this.receiver);

        this.socket.on('refreshPage', () => {
          this.GetUserByUsername(this.receiver);
        });
      });
  }

  ngAfterViewInit(): void {
    // This params will be send to backend, and new event will be emitted from backend
    const params = {
      room1: this.user.username,
      room2: this.receiver
    };

    // new event for joining in the chat
    this.socket.emit('join chat', params);
  }

  GetUserByUsername(name) {
    this.usersService.GetUserByName(name)
      .subscribe(data => {
        // console.log(data);
        this.receiverData = data.result;

        this.getAllMessages(this.user._id, data.result._id);
      });
  }

  sendMessage() {
    if (this.message) {
      this.messageService.sendMessage(this.user._id, this.receiverData._id, this.receiverData.username, this.message)
        .subscribe(data => {
          this.socket.emit('refresh', {});
          // console.log(data);
          this.message = '';
        });
    }
  }

  getAllMessages(senderId, receiverId) {
    this.messageService.getAllMessages(senderId, receiverId)
      .subscribe(data => {
        // console.log(data);
        this.messagesArray = data.messages.message;
      });
  }
}
