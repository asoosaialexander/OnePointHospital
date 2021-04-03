import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFormService } from 'src/app/services/custom-form.service';
import { CustomForm } from 'src/app/shared/custom-form';
import { QuestionBase } from 'src/app/shared/question-base';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})

export class DynamicFormComponent implements OnInit {

  dynamicForm: CustomForm = new CustomForm();
  questions!: QuestionBase[];
  form!: FormGroup;
  payLoad = '';

  constructor(private customFormService:CustomFormService) {
  }

  ngOnInit() {
    let id = 1;
    this.form = this.toFormGroup(this.dynamicForm.fields);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  toFormGroup(questions: QuestionBase[]) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ?
        new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
