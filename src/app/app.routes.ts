// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { Routes } from '@angular/router';
import { AdminLoginComponent } from './features/admin-login/admin-login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CourseListComponent } from './features/course-list/course-list.component';
import { TeacherPanelComponent } from './features/teacher-panel/teacher-panel.component';
import { TeacherCoursesComponent } from './features/teacher-courses/teacher-courses.component';
import { AddClassDetailsComponent } from './features/add-class-details/add-class-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AdminLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'teachers', component: TeacherPanelComponent },
  { path: 'teachers/groups', component: TeacherCoursesComponent },
  { path: 'teachers/group/details/:id', component: AddClassDetailsComponent },
];
