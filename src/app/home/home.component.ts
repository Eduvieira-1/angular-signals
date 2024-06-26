import { Component, signal, inject } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';



@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  courses = signal<Course[]>([]);

  coursesService = inject(CoursesService);

  constructor(){
    this.loadCourses()
    .then(() => console.log('All courses loaded', this.courses()));
  }

  async loadCourses(){
    try{
      const courses = await this.coursesService.loadAllCourses();
      this.courses.set(courses);
    } catch(err){
      alert('Error loading courses!')
      console.error(err);

    }
  }

}
