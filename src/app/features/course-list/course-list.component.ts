import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {  // Implement OnInit
  isModalOpen = false;
  newCourse = {
    title: '',
    slug: '',
    description: '',
    course_category_id: null,
    instructor_id: null,
    classes_id: '',
    thumbnail: null
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAllCourses();  // Call the GET API when the component loads
  }

  openAddCourseModal() {
    this.isModalOpen = true;
  }

  closeAddCourseModal() {
    this.isModalOpen = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.newCourse.thumbnail = file;
  }

  // Method to handle POST request to add a course
  submitCourseForm() {
    const formData = new FormData();
    formData.append('title', this.newCourse.title);
    formData.append('slug', this.newCourse.slug);
    formData.append('description', this.newCourse.description || '');
    if (this.newCourse.course_category_id) {
      formData.append('course_category_id', String(this.newCourse.course_category_id));
    }
    if (this.newCourse.instructor_id) {
      formData.append('instructor_id', String(this.newCourse.instructor_id));
    }
    formData.append('classes_id', this.newCourse.classes_id);
    if (this.newCourse.thumbnail) {
      formData.append('thumbnail', this.newCourse.thumbnail);
    }

    this.http.post('https://api.classwix.com/api/course', formData).subscribe({
      next: (response) => {
        console.log('Course added successfully:', response);
        this.toastr.success('Course added successfully!', 'Success');
        this.closeAddCourseModal();
      },
      error: (error) => {
        console.error('Error adding course:', error);
        this.toastr.error('Failed to add course.', 'Error');
      }
    });
  }

  // Method to handle GET request to retrieve all courses
  getAllCourses() {
    this.http.get('https://api.classwix.com/api/course').subscribe({
      next: (response) => {
        console.log('All courses:', response); // Display all course data in console
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        this.toastr.error('Failed to fetch courses.', 'Error');
      }
    });
  }
}
