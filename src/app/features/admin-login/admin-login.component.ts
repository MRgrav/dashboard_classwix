// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-login',
//   imports: [],
//   templateUrl: './admin-login.component.html',
//   styleUrl: './admin-login.component.css'
// })
// export class AdminLoginComponent {

// }

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule], // Import necessary modules
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  userType: string = 'admin';

  login() {
    console.log('Logging in as:', this.userType);
    // Add API call logic here
  }
}

