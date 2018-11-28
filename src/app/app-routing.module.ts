import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { DetailsPostComponent } from './details-post/details-post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditPostComponent } from './edit-post/edit-post.component';

const appRoutes: Routes = [
  { path: '', component: DetailsPostComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'details', component: DetailsPostComponent },  
  { path: 'edit/:id', component: EditPostComponent },
  { path: '**', component: PageNotFoundComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
