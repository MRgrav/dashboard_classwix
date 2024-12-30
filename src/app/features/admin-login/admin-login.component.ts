import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  userType: string = 'admin';

  constructor(private http: HttpClient) {}

  login() {
    const url = 'https://example.com/api/login'; // Replace with your API endpoint
    const payload = {
      username: this.username,
      password: this.password,
      userType: this.userType,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post(url, payload, { headers }).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
