import { inject } from '@angular/core';
import { Lesson } from './../models/lesson.model';
import { signal } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { ActivatedRoute } from '@angular/router';
import { LoadingIndicatorComponent } from '../loading/loading.component';

@Component({
  selector: 'course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {

  course = signal<Course | null>(null);

  lessons = signal<Lesson[]>([]);

  route = inject(ActivatedRoute)

  ngOnInit() {
    this.course.set(this.route.snapshot.data["course"]);
    this.lessons.set(this.route.snapshot.data["lessons"]);
  }

}
