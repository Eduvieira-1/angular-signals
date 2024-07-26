import { LessonsService } from './../services/lessons.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Lesson } from "../models/lesson.model";

export const courseLessonsResolver: ResolveFn<Lesson[]> =
async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const courseId = route.paramMap.get("courseId");
    if(!courseId){
      return [];
    }

    const lessonService = inject(LessonsService);
    return lessonService.loadLessons({courseId})
  }
