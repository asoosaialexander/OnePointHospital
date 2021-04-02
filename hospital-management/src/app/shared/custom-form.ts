import { QuestionBase } from "./question-base";

export interface CustomForm {
  id: string;
  name: string;
  type: string;
  columns: number;
  alwaysInclude: boolean;
  fields: QuestionBase[];
  active: boolean;
}
