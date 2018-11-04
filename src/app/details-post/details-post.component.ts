import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import { Observable } from 'rxjs';
import {Post} from '../post.model';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.css']
})
export class DetailsPostComponent implements OnInit {

  posts: any = [];

  constructor(private ps:PostService) { }

  ngOnInit() {
    this.ps.getPostsData().subscribe(data => {
      this.posts = data;
    });
  }

}
