import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postTitle: string = '';
  postContent: string = '';

  // @Output() postCreated = new EventEmitter<Post>();


  constructor(public postService: PostService) { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return null;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

}
