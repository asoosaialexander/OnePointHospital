import { QuestionBase } from "./question-base";

export interface CustomForm {
  id:number;
  name: string;
  type: string;
  columns: number;
  alwaysInclude: boolean;
  fields: QuestionBase[];
}
