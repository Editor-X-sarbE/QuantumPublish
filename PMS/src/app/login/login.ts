import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';   // ✅ Correct import

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  constructor(private http: HttpClient) { }

  data = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  public handleSubmit() {
    console.log('Form Data:', this.data.value);

    this.http.post('http://localhost:8082/loginUser', this.data.value).subscribe((data: any) => {
      console.log(data);
      if (data === true) {
        alert("Login Successful");
        // window.location.href = "/dashboard";
      } else {
        alert("Login Failed");
      }
    });
  }
}
