import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
  registerForm: FormGroup;

  constructor(private router: Router, private apiService: ApiService) { }

  message = '';

  ngOnInit() {
    // angular reactive form 
    //controle de saisi
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  registerBtn() {
    if (this.registerForm.valid) {
      this.message = '';
      this.apiService.registerApi(this.registerForm.value).subscribe(res => {
        console.log(res.json());
        if (res.json()._id) {
          this.router.navigateByUrl('/login');
        } else {
          this.message = res.json().message;
        }
      });
    }
  }
}