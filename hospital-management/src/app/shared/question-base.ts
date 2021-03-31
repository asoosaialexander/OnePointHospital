export class QuestionBase {
  customFormId: number;
  value: string;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  colspan: number;
  options: { key: string, value: string }[];

  constructor(options: {
    customFormId?: number;
    value?: string;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    colspan?: number;
    options?: { key: string, value: string }[];
  } = {}) {
    this.customFormId = options.customFormId === undefined ? 0 : options.customFormId;
    this.value = options.value || '';
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.colspan = options.colspan === undefined ? 1 : options.colspan;
    this.options = options.options || [];
  }
}

export class TextboxQuestion extends QuestionBase {
  controlType = 'textbox';
}

export class DropdownQuestion extends QuestionBase {
  controlType = 'dropdown';
}
