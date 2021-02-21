import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { environment } from './../../environments/environment';

const BACKEND_URL = `${environment.apiUrl}posts/`

@Injectable({providedIn: 'root'})

export class PostService {
    private posts: any = [];

    constructor(private http: HttpClient) {}

    getPosts(postsPerPage: number, currentPage: number) {

      const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`
        return this.http.get<{message: string, posts: any, totalPosts: number}>
        (BACKEND_URL + queryParams)
          .pipe(map(postData => {
            return {posts: postData.posts.map(post => {
              return { title: post.title,
                content: post.content,
                id: post._id,
                creator: post.creator,
                imagePath: post.imagePath
              };
            }),
            totalPosts: postData.totalPosts}
          }));
    }


    addPost(title: string, content: string, image: File) {
      // FormData used when exist file upload and use append function
      const postData = new FormData();
      postData.append('title', title)
      postData.append('content', content)
      postData.append('image', image, title)

      this.http.post<Post>(BACKEND_URL, postData)
      .subscribe((response) => {
        this.posts.push(postData);
      });
    }

    deleletPost(postId: string) {
      return this.http.delete(BACKEND_URL + postId);
    }
}
