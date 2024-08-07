import { firstValueFrom } from 'rxjs';
import { GetCoursesResponse } from './../models/get-courses.response';
import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from "@angular/core";
import {environment} from "../../environments/environment.development";
import {Course} from "../models/course.model";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  http = inject(HttpClient)
  env = environment;

  async loadAllCourses(): Promise<Course[]> {
    const course$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
    const response = await firstValueFrom(course$);
    return response.courses;
  }

  async getCourseById(courseId: string): Promise<Course>{
      const course$ =
      this.http.get<Course>(
        `${this.env.apiRoot}/courses/${courseId}`)
      return firstValueFrom(course$)
  }

  async createCourse(course: Partial<Course>): Promise<Course>{
    const course$ = this.http.post<Course>(`${this.env.apiRoot}/courses`, course)
    return  firstValueFrom(course$);
  }

  async saveCourse(courseId: string, changes: Partial<Course>): Promise<Course>{
    const course$ = this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`, changes)
    return  firstValueFrom(course$);
  }

  async deleteCourse(courseId: string){
    const delete$ = this.http.delete(`${this.env.apiRoot}/courses/${courseId}`)
    return  firstValueFrom(delete$)
  }

}
