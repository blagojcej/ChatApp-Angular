import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  socket: any;
  users = [];
  loggedInUser: any;
  userArray = [];

  constructor(private usersService: UsersService, private tokenService: TokenService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    // this.usersService.GetAllUsers()
    //   .subscribe(data => {
    //     console.log(data);
    //   });

    this.loggedInUser = this.tokenService.GetPayload();

    this.GetAllUsers();
    this.GetUser();

    // Listen refreshPage event
    this.socket.on('refreshPage', () => {
      this.GetAllUsers();
      this.GetUser();
    });
  }

  GetAllUsers() {
    this.usersService.GetAllUsers()
      .subscribe(data => {
        _.remove(data.result, { username: this.loggedInUser.username });
        this.users = data.result;
      });
  }

  GetUser() {
    this.usersService.GetUserById(this.loggedInUser._id)
      .subscribe(data => {
        // console.log(data);
        this.userArray = data.result.following;
      });
  }

  FollowUser(user) {
    // console.log(user);
    this.usersService.FollowUser(user._id)
      .subscribe(data => {
        // console.log(data);
        // When user click to follow user emit socket event
        this.socket.emit('refresh', {});
      })
  }

  CheckInArray(arr, id) {
    const result = _.find(arr, ['userFollowed._id', id]);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
