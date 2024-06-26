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

}
