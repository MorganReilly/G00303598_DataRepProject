import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { DetailsPostComponent } from './details-post/details-post.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'create', component: CreatePostComponent },
  { path: 'details', component: DetailsPostComponent },
  { path: '', component: DetailsPostComponent },
  { path: 'search', component: SearchPostComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
