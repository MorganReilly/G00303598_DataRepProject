import { Component, OnInit } from '@angular/core';
import { ExerciseList } from '../exercise-list';
import { NgForm } from "@angular/forms";
import {PostService} from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private service:PostService) { }

  type = ['Push', 'Pull', 'Legs'];
  submitted = false;

  model = new ExerciseList('Bench Press', this.type[0]);

  newExercise() {
    this.model = new ExerciseList('', '');
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  onAddPost(form: NgForm) {

    this.submitted = true;

    console.log("Name:" + this.model.name);
    console.log("Type:" + this.model.type);

    this.service.addPost(this.model.name, this.model.type).subscribe();

    //console.log(form.value);
    //form.resetForm();
  }

  ngOnInit() {
  }

}
