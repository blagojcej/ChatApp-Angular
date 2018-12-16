import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  socket: any;
  followers = [];
  user: any;

  constructor(private tokenService: TokenService, private usersService: UsersService) {
    this.socket = io('http://localhost:3000');
   }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

    this.GetUser();

        // When user click on Follow User in People Component listen refreshPage event
        this.socket.on('refreshPage', () => {
          this.GetUser();
        });
    
  }

  GetUser() {
    this.usersService.GetUserById(this.user._id)
      .subscribe(data => {
        console.log(data);
        this.followers = data.result.followers;
      }, error => {
        console.log(error);
      });
  }

}
