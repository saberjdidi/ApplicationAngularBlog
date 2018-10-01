import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  addForm: FormGroup;
  article = {};
  userId = '';
  articleToUpdate = null;

  constructor(private router: Router, private apiService: ApiService) {
    const token = localStorage.getItem('token');
    this.userId = jwt_decode(token).data._id;
   }

  ngOnInit() {
    console.log(this.userId);
    this.addForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      content: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),

    });
    this.apiService.getArticle().subscribe(res => {
      console.log(res.json());
      this.article = res.json();
    })
    
  }
  onAddClick() {
    if (this.addForm.valid) {
      this.apiService.postArticle(this.addForm.value).subscribe(res => {
        this.ngOnInit();
      });
    }
  }
  deleteArticle(id) {
    if(confirm('Are you sur to delete this article ?') == true){
      this.apiService.deleteArticle(id).subscribe(res => {
        this.ngOnInit();
      })
    }  
  }
  updateArticle() {
  console.log(this.articleToUpdate);
      this.apiService.editArticle(this.articleToUpdate._id  , this.articleToUpdate).subscribe(res => {
        this.articleToUpdate = null;
        this.ngOnInit();
      })
    

  }

  logoutBtn() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }


}
