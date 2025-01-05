import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-panel',
  templateUrl: './teacher-panel.component.html',
  styleUrls: ['./teacher-panel.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Add required modules here
})
export class TeacherPanelComponent {
  // Mock data for classes and students
  classes = ['Mathematics', 'Science', 'History', 'English'];
  students = ['John Doe', 'Jane Smith', 'Emily Johnson', 'Michael Brown'];

  // Object to store selected students
  selectedStudents: { [key: string]: boolean } = {};

  onSubmit() {
    const selected = Object.keys(this.selectedStudents).filter(
      (student) => this.selectedStudents[student]
    );
    console.log('Selected Students:', selected);
  }
}
