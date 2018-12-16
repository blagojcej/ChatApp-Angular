import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.css']
})
export class TopStreamsComponent implements OnInit {

  socket: any;
  topPosts = [];
  user: any;

  constructor(private postsService: PostsService, private tokenService: TokenService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

    this.AllPosts();
    this.socket.on('refreshPage', (data) => {
      this.AllPosts();
    });
  }

  AllPosts() {
    this.postsService.getAppPosts()
      .subscribe((data) => {
        console.log(data.posts);
        this.topPosts = data.top;
      }, err => {
        if (err.error.token === null) {
          this.tokenService.DeleteToken();
          this.router.navigate(['']);
        }
      });
  }

  LikePost(post) {
    // console.log(post);
    this.postsService.addLike(post)
      .subscribe(data => {
        console.log(data);
        this.socket.emit('refresh', {});
      }, err => console.log(err));
  }

  CheckInLikesAray(arr, username) {
    return _.some(arr, { username: username });
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  openCommentBox(post) {
    this.router.navigate(['post', post._id]);
  }
}
