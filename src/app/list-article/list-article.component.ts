import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  addForm: FormGroup
  article;
  articleId = '';

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.articleId = params.idArticle; //idArticle se trouve dans path (app.module.ts)
      console.log(this.articleId);
    })
   }

  ngOnInit() {
    console.log(this.articleId);
    this.apiService.getarticleById(this.articleId).subscribe(res => {
      console.log(res.json());
      this.article = res.json(); //get article by id
    });
    this.addForm = new FormGroup({
      content: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    });

    this.apiService.getArticle().subscribe(res => {
      console.log(res.json());
      // this.articles = res.json();  //get tous les articles
      // console.log(this.articles);

    })
  }
  addCommentbtn() {
    if (this.addForm.valid) {
      const token = localStorage.getItem('token');
      const userId = jwt_decode(token).data._id;
      const commentObj = {
        "content": this.addForm.value.content,
        "author": userId
      }
      this.apiService.postcomment(this.articleId, commentObj).subscribe(res => {
        console.log(res.json());
        this.ngOnInit();
      });
    }

  }

}
