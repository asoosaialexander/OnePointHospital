import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;
  payLoad = {};
  showForm = false;

  constructor(private customFormService: CustomFormService, private fb: FormBuilder) {
    let id = "6066b16f58bdb7c1f273cb10";
    this.customFormService.getCustomFormById(id).subscribe((data) => {
      this.dynamicForm = data;
      this.form = this.toFormGroup(this.dynamicForm.fields);
      this.showForm=true;
    });
  }

  ngOnInit() {
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
