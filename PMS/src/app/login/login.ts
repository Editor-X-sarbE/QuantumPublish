import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router'; // ✅ Added Router import

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  constructor(private http: HttpClient, private router: Router) { } // ✅ Inject Router

  data = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  public handleSubmit() {
    console.log('Form Data:', this.data.value);

    this.http.post('http://localhost:8082/loginUser', this.data.value).subscribe({
      next: (data: any) => {
        console.log(data);

        if (data === true) {
          alert('Login Successful ✅');
          this.router.navigate(['/home']); // ✅ Redirect to home page
        } else {
          alert('Invalid Email or Password ❌');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Server error. Please try again later.');
      }
    });
  }
}
