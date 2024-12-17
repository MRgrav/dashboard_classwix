import { Component } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common'; // Import NgIf and CommonModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [NgIf, CommonModule], // Import CommonModule for *ngIf
})
export class NavbarComponent {
  username: string | undefined;
  isDropdownOpen: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.username = 'John Doe';
    }, 1000);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    console.log('Logging out...');
  }
}
