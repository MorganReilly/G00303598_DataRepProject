import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';

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

  //Code to MODIFY
  onModify(id: String) {
    console.log("onModify(): \nID: " + id);

    //Call method from post service - basic way
    //When get data back
    this.ps.deletePost(id).subscribe(() => {
      //Refresh list
      this.ngOnInit();
    });

  }

}
