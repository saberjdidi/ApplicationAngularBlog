import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  addForm: FormGroup;
  articles;
  content='';

  constructor(private router: Router, private apiService: ApiService) {
   
  }

  ngOnInit() {
    this.apiService.getArticle().subscribe(res => {
      this.articles = res.json();
      for(let i = 0; i < this.articles.length; i++){
        if(this.articles[i].content.length > 5){
          this.articles[i].content = this.articles[i].content.substring(0,4) + '... ';
        }
      }
      console.log(res.json());
      console.log(this.articles);
    })
  }


}
