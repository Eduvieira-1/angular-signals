import { Component, contentChild, input, model, ElementRef, contentChildren } from '@angular/core';
import {CourseCategory} from "../models/course-category.model";

@Component({
  selector: 'course-category-combobox',
  standalone: true,
  imports: [],
  templateUrl: './course-category-combobox.component.html',
  styleUrl: './course-category-combobox.component.scss'
})
export class CourseCategoryComboboxComponent {


  label = input.required<string>();

  value = model.required<CourseCategory>();

  titles = contentChildren<ElementRef>("title");

  onCategoryChanged(category: string){
    this.value.set(category as CourseCategory);
  }
}
