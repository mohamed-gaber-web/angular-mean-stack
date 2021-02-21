import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { mimeType } from './mime-type.validator'; // validate upload file image

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postTitle = '';
  postContent = '';
  form: FormGroup;
  imagePrev;

  // @Output() postCreated = new EventEmitter<Post>();


  constructor(public postService: PostService, private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required, Validators.minLength(10)]}),
      image:new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    })
  }

  onAddPost() {
    if (this.form.invalid) {
      return null;
    }
    this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    this.form.reset();
    this.router.navigate(['/']);
  }

  // important code upload file and create prev image
  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]; // name / size / type
    this.form.patchValue({ image: file }); // patchValue => update one input from form
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrev = reader.result; // show image
    }

    reader.readAsDataURL(file);
  }

}
