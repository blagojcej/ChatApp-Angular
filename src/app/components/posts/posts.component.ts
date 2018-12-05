import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  socket: any;
  posts = [];
  user: any;

  constructor(private postsService: PostsService, private tokenService: TokenService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user=this.tokenService.GetPayload();

    this.AllPosts();
    this.socket.on('refreshPage', (data) => {
      this.AllPosts();
    });
  }

  AllPosts() {
    this.postsService.getAppPosts()
      .subscribe((data) => {
        console.log(data.posts);
        this.posts = data.posts;
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
    return _.some(arr, {username: username});
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }
}
