import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  socket: any;

  commentForm: FormGroup;
  postId: any;
  commentsArray = [];
  post: string;

  constructor(private fb: FormBuilder, private postService: PostsService, private route: ActivatedRoute) { 
    this.socket=io('http://localhost:3000');
  }

  ngOnInit() {
    //select element with class nav-content (look at toolbar component which item has this class)
    this.toolbarElement = document.querySelector('.nav-content');

    // id is the parameter send from router in streams-routing.module.ts
    this.postId = this.route.snapshot.paramMap.get('id');

    this.init();

    this.GetPost();

    // Get back all comments after posting comment
    this.socket.on('refreshPage', (data) => {
      this.GetPost();
    })
  }

  init() {
    this.commentForm = this.fb.group({
      comment: [
        '',
        Validators.required
      ]
    })
  }

  ngAfterViewInit(): void {
    this.toolbarElement.style.display = 'none';
  }

  AddComment() {
    this.postService.addComment(this.postId, this.commentForm.value.comment)
      .subscribe(data => {
        this.socket.emit('refresh', {});
        // console.log(data);
        this.commentForm.reset();
      });
  }

  GetPost() {
    this.postService.getPost(this.postId)
      .subscribe(data => {
        console.log(data);
        this.post=data.post.post;
        this.commentsArray=data.post.comments.reverse();
      })
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }
}
