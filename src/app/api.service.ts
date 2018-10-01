import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http) { }

  loginApi(form) {
    return this.http.post('http://localhost:3000/auth/login', form);
  }

  registerApi(form) {
    return this.http.post('http://localhost:3000/auth/register', form);
  }
  getArticle() {
    return this.http.get('http://localhost:3000/blog/article');
  }
  postArticle(form) {
    return this.http.post('http://localhost:3000/blog/article', form);
  }
  deleteArticle(id) {
    return this.http.delete('http://localhost:3000/blog/article/' + id);
  }
  editArticle(id, article) {
    console.log(article)
    return this.http.put('http://localhost:3000/blog/article/' + id, article);
  }
  getarticleById(id) {
    return this.http.get(`http://localhost:3000/blog/article/${id}`)
  }
  postcomment(id, form) {
    return this.http.post('http://localhost:3000/blog/comment/' + id, form);
  }
  
}
