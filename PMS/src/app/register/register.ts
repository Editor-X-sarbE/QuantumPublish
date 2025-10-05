import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  constructor(private http: HttpClient) { }

  register = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public handleSubmit() {
    console.log('Form Data:', this.register.value);

    this.http.post('http://localhost:8082/addUser', this.register.value).subscribe((data: any) => {
      alert("registration succesfully " + data);
    }, error => {
      alert("Registration Successful");
      window.location.href = "/login";
      // console.error('There was an error!', error);
    });
  }
}
