import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  socketHost: any;
  socket: any;
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostsService) {
    this.socketHost='http://localhost:3000';
    this.socket=io(this.socketHost);
   }

  ngOnInit() {
    this.init();
  }

  init() {
    this.postForm = this.fb.group({
      post: ['', Validators.required]
    })
  }

  submitPost() {
    // console.log(this.postForm.value);
    this.postService.addPost(this.postForm.value)
      .subscribe(data => {
        // console.log(data);
        // Log data at backend
        // this.socket.emit('refresh', {data: 'this is an event test'});
        this.socket.emit('refresh', {});
        this.postForm.reset();
      });
  }

}
