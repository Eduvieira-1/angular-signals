import { CourseCategory } from './../models/course-category.model';
import { signal, effect } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EditCourseDialogData } from './edit-course-dialog.data.model';
import { LoadingIndicatorComponent } from '../loading/loading.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { CourseCategoryComboboxComponent } from '../course-category-combobox/course-category-combobox.component';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course.model';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent,
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss',
})
export class EditCourseDialogComponent {

  dialogRef = inject(MatDialogRef);

  data: EditCourseDialogData = inject(MAT_DIALOG_DATA)

  fb = inject(FormBuilder)

  form = this.fb.group({
    title: [''],
    longDescription: [''],
    category: [''],
    iconUrl: [''],
  })

  courseService = inject(CoursesService);

  category = signal<CourseCategory>("BEGINNER");

  constructor(){
    this.form.patchValue({
      title: this.data?.course?.title,
      longDescription: this.data?.course?.longDescription,
      iconUrl: this.data?.course?.iconUrl
    })

    this.category.set(this.data?.course?.category ?? "BEGINNER");

    effect(() => {
      console.log('...', this.category());
    })
  }

  onClose() {
    this.dialogRef.close();
  }

  async onSave(){
    const courseProps = this.form.value as Partial<Course>;
    courseProps.category = this.category();
    if(this.data?.mode === "update"){
      await this.saveCourse(this.data?.course!.id, courseProps);
    }
    else if(this.data?.mode === "create"){
      await this.createCourse(courseProps)
    }
  }

  async createCourse(course: Partial<Course>){
    try{
      const newCourse = await this.courseService.createCourse(course);
      this.dialogRef.close(newCourse);
    }catch(err){
      console.log(err);
      alert('error')
    }
  }


  async saveCourse(courseId: string, changes: Partial<Course>){
    try{
      const updatedCourse = await this.courseService.saveCourse(courseId, changes);
      this.dialogRef.close(updatedCourse);
    }catch(err){
      console.error(err);
      alert('Failed to save the course')
    }
  }
}

export function openEditCourseDialog(
  dialog: MatDialog,
  data: EditCourseDialogData
) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = '400px';
  config.data = data;

  const close$ = dialog.open(EditCourseDialogComponent, config).afterClosed();

  return firstValueFrom(close$);
}
