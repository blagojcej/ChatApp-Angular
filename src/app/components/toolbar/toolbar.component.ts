import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';
import * as moment from 'moment';
import _ from 'lodash';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  socket: any;
  user: any;
  notifications = [];
  count = [];
  chatList = [];

  constructor(private tokenService: TokenService, private router: Router, private usersService: UsersService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    // console.log(this.user);

    const dropdownElement = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropdownElement, {
      aligment: 'right',
      hover: true,
      coverTrigger: false
    });

    const dropdownElementTwo = document.querySelector('.dropdown-trigger1');
    M.Dropdown.init(dropdownElementTwo, {
      aligment: 'right',
      hover: true,
      coverTrigger: false
    });

    this.getUser();

    this.socket.on('refreshPage', () => {
      this.getUser();
    });
  }

  getUser() {
    this.usersService.GetUserById(this.user._id)
      .subscribe(data => {
        this.notifications = data.result.notifications.reverse();
        const value = _.filter(this.notifications, ['read', false]);
        // console.log(value);
        this.count = value;
        this.chatList = data.result.chatList;
        console.log(this.chatList);
      }, err => {
        if (err.error.token === null) {
          this.tokenService.DeleteToken();
          this.router.navigate(['']);
        }
      });
  }

  markAll() {
    this.usersService.markAllAsRead()
      .subscribe(data => {
        // console.log(data);
        this.socket.emit('refresh', {});
      });
  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  messageDate(data) {
    return moment(data).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'DD/MM/YYYY',      
      sameElse: 'DD/MM/YYYY',      
    });
  }
}
