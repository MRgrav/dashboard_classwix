import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TeacherCoursesComponent {
  groupDetails: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  // Corrected fetchCourses method
  fetchCourses(): void {
    this.http.get<any>('https://api.classwix.com/api/groups').subscribe(
      (data) => {
        console.log('Raw Group details:', data); // Log raw response
        if (data?.groups) {
          console.log('Group details:', data.groups);
          this.groupDetails = data.groups.map((group: { 
            id: any; 
            course_id: any; 
            name: any; 
            description: any; 
            course: { title: any; thumbnail: any; }; 
          }) => ({
            id: group.id,  // The group id
            course_id: group.course_id,  // The associated course_id
            name: group.name,
            description: group.description,
            title: group.course?.title,  // Assuming the course is a nested object
            thumbnail: group.course?.thumbnail || 'https://via.placeholder.com/150',  // Default image
          }));
        } else {
          console.error('No groups found in response');
        }
      },
      (error) => {
        console.error('Error fetching group details:', error);
      }
    );
  }
  

  // Corrected navigateToCourseDetails method
  navigateToCourseDetails(courseId: number): void {
    this.router.navigate([`/teachers/group/details/${courseId}`]);
  }
}
