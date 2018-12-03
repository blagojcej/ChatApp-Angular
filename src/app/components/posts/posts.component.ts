import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import * as moment from 'moment';
import io from 'socket.io-client';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  socket: any;
  posts = [];

  constructor(private postsService: PostsService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
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

  TimeFromNow(time) {
    return moment(time).fromNow();
  }
}
