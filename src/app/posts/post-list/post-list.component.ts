import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../post.service';

import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  subPost: Subscription; // the first way
  authSub: Subscription;
  sub: Subscription[] = []; // the second way
  isLoading = false;
  isAuth: boolean = false;
  userId: string;
  // paginator
  totalPosts: number = 0; // total posts
  postsPerPage: number = 3; // total posts in page
  pageSizeOptions: Array<number> = [1, 2, 5, 10]; // dropdown numbers
  currentPage: number = 1;


  constructor(
    public postService: PostService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.subPost = this.postService.getPosts(this.postsPerPage, this.currentPage)
    .subscribe((posts: {message: string, posts: Post[], totalPosts: number}) => {
      console.log(posts);

      this.isLoading = false;
      this.totalPosts = posts.totalPosts;
      this.posts = posts.posts;
    });

    // used resolver in component
    // this.subPost = this.activatedRoute.data.subscribe(posts =>console.log(posts))


    this.isAuth = this.authService.getIsAuthentcated();

    this.authSub = this.authService.getIsAuth().subscribe(authStatus => {
      this.isAuth = authStatus;
      this.userId = this.authService.getUserId();
    })

    this.sub.push(this.subPost); // unsubscribe() the second way
    this.sub.push(this.authSub)
  }

  postDeleted(postId: string) {
    this.isLoading = true;
    this.postService.deleletPost(postId)
    .subscribe((newData) => {
      window.location.reload();
      this.postService.getPosts(this.postsPerPage, this.currentPage)
    });
  }


  onChangedPage(pageData: PageEvent) {
    // console.log(pageData);
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    // console.log(this.currentPage, this.postsPerPage);
     this.postService.getPosts(this.postsPerPage, this.currentPage)
     .subscribe((posts: {message: string, posts: Post[], totalPosts: number}) => {
       this.isLoading = false;
       this.totalPosts = posts.totalPosts;
       this.posts = posts.posts;
     })
  }

  ngOnDestroy(): void {
    this.sub.forEach(subscribtion => {
      subscribtion.unsubscribe();
    });
  }

}
