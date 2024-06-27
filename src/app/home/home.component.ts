import { Component, signal, inject, computed, effect } from '@angular/core';
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


  #courses = signal<Course[]>([]);

  coursesService = inject(CoursesService);

  beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(courses => courses.category === "BEGINNER")
  })

  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(courses => courses.category === "ADVANCED")
  })

  constructor(){

    effect(() => {
      console.log('beginner courses: ', this.beginnerCourses());
      console.log('advanced courses: ', this.advancedCourses());

    })

    this.loadCourses()
    .then(() => console.log('All courses loaded', this.#courses()));
  }

  async loadCourses(){
    try{
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses);
    } catch(err){
      alert('Error loading courses!')
      console.error(err);

    }
  }

}
