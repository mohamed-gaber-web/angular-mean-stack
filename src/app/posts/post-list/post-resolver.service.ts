import { PostService } from './../post.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../post.model';

@Injectable({
  providedIn: 'root'
})
export class PostResolverService implements Resolve<any> {

  constructor(private postService: PostService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> | Promise<Post[]> {
    // return this.postService.getPosts();
    // const posts: Post[] = [
    //   {id: '1', title: 'my post title 1', content: 'my content title 1'},
    //   {id: '2', title: 'my post title 2', content: 'my content title 2'},
    //   {id: '3', title: 'my post title 3', content: 'my content title 3'}
    // ]
  //   const observable = Observable.create(obs => {
  //     obs.next(posts)
  //   })
  //   return observable;
  return;
  }


}
