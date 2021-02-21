import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthModule } from './auth/auth.module';



// import { PostResolverService } from './posts/post-list/post-resolver.service';

const routes: Routes = [
  // add reolse in route after component resolve: { posts: PostResolverService }

  { path: 'auth', loadChildren: "./auth/auth.module#AuthModule"},
  { path: 'posts', loadChildren: "./posts/posts.module#PostModule" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}



// create module
// file name [ name.module.ts ]
