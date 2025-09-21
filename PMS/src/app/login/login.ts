import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
// ⬇️ Import HttpClient for API calls
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  // ⬇️ Inject HttpClient via constructor
  constructor(private http: HttpClient) { }

  data = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  public handleSubmit() {
    console.log('Form Data:', this.data.value);

    // ⬇️ Example API call (replace with your backend endpoint)
    this.http.post('http://localhost:8082/loginUser', this.data.value).subscribe((data: any) => {
      console.log(data);
      if (data == true) {
        alert("Login Successful");
        // window.location.href="/dashboard";
      } else {
        alert("Login Failed");
      }
    });
    // this.http.post('http://localhost:8082/api/login', this.data.value).subscribe({
    //   next: (response) => console.log('✅ API Response:', response),
    //   error: (err) => console.error('❌ API Error:', err)
    // });
  }
}
