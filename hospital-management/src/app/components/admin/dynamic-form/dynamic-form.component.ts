import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionBase } from 'src/app/shared/question-base';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [QuestionService]
})

export class DynamicFormComponent implements OnInit {

  questions!: QuestionBase[];
  form!: FormGroup;
  payLoad = '';

  constructor(service: QuestionService) {
    service.getQuestions().subscribe((data) => {
      this.questions = data;
    });
  }

  ngOnInit() {
    this.form = this.toFormGroup(this.questions);
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
