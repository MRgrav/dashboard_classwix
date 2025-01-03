import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isSidebarOpen = true;

  constructor(private router: Router) {} 

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navigateToCourses() {
    this.router.navigate(['/courses']); 
  }
  
  navigateToDashboard() {
    this.router.navigate(['/dashboard']); 
  }
}
