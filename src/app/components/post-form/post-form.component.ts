import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostsService) { }

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
        console.log(data);
      });
  }

}
