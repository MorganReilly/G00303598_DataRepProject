import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseList } from '../exercise-list';
import { NgForm } from "@angular/forms";
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private service: PostService, private router: Router) { }

  type = ['Push', 'Pull', 'Leg'];
  submitted = false;

  setRange = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  repRange = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15','16','17','18','19','20'];

  //Used for displaying content in feild when page is loaded
  basicModel = {
    name: "Bench Press",
    message: "Some content about bench press..."
  };

  //Content displayed on page when loaded again is pulled from here
  model = new ExerciseList('', this.type[0], '', this.setRange[4], this.repRange[4]);

  newExercise() {
    this.model = new ExerciseList('', '', '', '', '');
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  onAddPost(form: NgForm) {
    this.submitted = true;

    console.log("Name:" + this.model.name);
    console.log("Type:" + this.model.type);
    console.log("Description:" + this.model.description);
    console.log("setRange:" + this.model.setRange);
    console.log("repRange:" + this.model.repRange);

    this.service.addPost(this.model.name, this.model.type,
      this.model.description, this.model.setRange, this.model.repRange).subscribe(() => {
        //When the button is pressed changed to the display all page
        this.router.navigate(['/details']);
      });

    //console.log(form.value);
    //form.resetForm();
  }

  ngOnInit() {
  }

  getUrl(){
   // return "url('../../assets/img/clean.jpg')";
  }

}
