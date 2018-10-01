import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  addForm: FormGroup
  article = {};

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      content: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    });
  }

  addArticle() {
    console.log(this.addForm.value);
    console.log(this.addForm.valid);
    if (this.addForm.valid) {
      
      this.apiService.postArticle(this.addForm.value).subscribe(res => {
        console.log(res.json());
        //this.ngOnInit();
      });

    }
  }  

}
