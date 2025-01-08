import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  phone: string = '';
  password: string = '';

  // Inject Router into the constructor
  constructor(private http: HttpClient, private router: Router) {}  // Added router here

  login() {
    const url = 'https://api.classwix.com/api/signin'; 
    const payload = {
      phone: this.phone,
      password: this.password,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post(url, payload, { headers }).subscribe(
      (response: any) => {
        console.log('Login successful:', response);

        // Store the token in localStorage
        localStorage.setItem('auth_token', response.token);  // Store the token

        // Redirect to the dashboard page
        this.router.navigate(['/teachers']);  // Ensure '/dashboard' route exists
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
