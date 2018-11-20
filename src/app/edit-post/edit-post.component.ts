import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExerciseList } from '../exercise-list';
import { PostService } from '../post.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post: any = [];

  constructor(private route: ActivatedRoute, private service: PostService, private router: Router) { }

  type = ['Push', 'Pull', 'Leg'];
  setRange = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  repRange = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

  model = new ExerciseList('', '', '', '', '');

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.service.editPost(this.route.snapshot.params['id']).subscribe(data => {
      this.post = data;

      this.model = new ExerciseList(this.post.name, this.post.type, this.post.description, this.post.setRange, this.post.repRange);
    });

  }

  onEditPost(form: NgForm) {
    //post._id form.value.name form.value.type form.value.description form.value.setRange form.value.repRange
    //console.log(this.model.name);
    this.service.updatePost(this.post._id, this.model.name, this.model.type,
      this.model.description, this.model.setRange, this.model.repRange).subscribe(() => {
        //When the button is pressed changed to the display all page
        this.router.navigate(['/details']);
      });
  }

}
