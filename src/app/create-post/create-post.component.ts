import { Component, OnInit } from '@angular/core';
import { ExerciseList } from '../exercise-list';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor() { }

  type = ['Push', 'Pull', 'Legs'];
  submitted = false;
  
  model = new ExerciseList('Bench Press', this.type[0]);

  onSubmit() {
    this.submitted = true;
    console.log("Name:" + this.model.name);
    console.log("Type:" + this.model.type);
  }

  newExercise(){
    this.model = new ExerciseList('','');
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
  }

}
