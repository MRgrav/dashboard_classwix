import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule

@Component({
  selector: 'app-course-list',
  standalone: true, // Standalone component
  imports: [FormsModule, CommonModule], // Add CommonModule here
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {
  isModalOpen = false;
  newCourse = {
    name: '',
    duration: '',
    fee: null,
    description: ''
  };

  // Open the modal
  openAddCourseModal() {
    this.isModalOpen = true;
  }

  // Close the modal
  closeAddCourseModal() {
    this.isModalOpen = false;
  }

  // Submit the form
  submitCourseForm() {
    console.log('Course Added:', this.newCourse);

    // Close the modal after submission
    this.closeAddCourseModal();
  }
}
