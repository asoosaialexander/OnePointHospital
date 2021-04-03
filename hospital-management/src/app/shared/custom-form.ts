import { QuestionBase } from "./question-base";

export class CustomForm {
  id: string;
  name: string;
  type: string;
  columns: number;
  alwaysInclude: boolean;
  fields: QuestionBase[];
  active: boolean;
  constructor() {
    this.id = this.name = this.type = "";
    this.columns = 0;
    this.alwaysInclude = this.active = false;
    this.fields = [];
  }
}
