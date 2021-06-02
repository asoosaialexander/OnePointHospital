import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomForm } from 'src/app/shared/custom-form';
import { QuestionBase } from 'src/app/shared/question-base';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})

export class DynamicFormComponent implements OnInit {

  @Input() selectedForm?: CustomForm;
  form!: FormGroup;
  payLoad = {};
  showForm = false;

  constructor() {
  }

  ngOnInit(): void {
    if (this.selectedForm) {
      this.form = this.toFormGroup(this.selectedForm.fields);
      this.showForm = true;
    }
  }

  onSubmit(): void {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  toFormGroup(questions: QuestionBase[]): FormGroup {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ?
        new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
