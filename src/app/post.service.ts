import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPostsData(): Observable<any> {
    return this.http.get("http://localhost:8081/api/posts");
  }

  private posts: Post[] = [];

  getPosts() {
    return [...this.posts];
  }

  //Used for adding to db
  addPost(name: string, type: string, description: string, setRange: string, repRange: string): Observable<any> {
    const post: Post = {name: name, type: type, description: description, setRange: setRange, repRange: repRange};
    return this.http.post("http://localhost:8081/api/posts",post);
  }

  //used for deleting from db
  deletePost(id: String): Observable<any>{
    console.log("deletePost() called");
    //Add unique id to end of post to identify document
    return this.http.delete("http://localhost:8081/api/posts/"+id);
  }
}
