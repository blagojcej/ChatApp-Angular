import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import * as moment from 'moment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts = [];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.AllPosts();
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
