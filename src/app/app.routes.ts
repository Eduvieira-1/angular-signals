import { courseLessonsResolver } from './course/course-lessons.resolver';
import { CourseComponent } from './course/course.component';
import { isUserAuthneticated } from './guards/auth.guard';
import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LessonsComponent} from "./lessons/lessons.component";
import { courseResolver } from './course/course.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isUserAuthneticated]
  },
  {
    'path': 'courses/:courseId',
    component: CourseComponent,
    canActivate: [isUserAuthneticated],
    resolve: {
      course: courseResolver,
      lessons: courseLessonsResolver
    }
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "lessons",
    component: LessonsComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
