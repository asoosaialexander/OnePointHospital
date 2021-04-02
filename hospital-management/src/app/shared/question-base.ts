export class QuestionBase {
  value: string;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  colspan: number;
  options: FieldOption[];

  constructor(options: {
    value?: string;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    colspan?: number;
    options?: FieldOption[];
  } = {}) {
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

export class FieldOption {
  key: string;
  value: string;

  constructor(id?: number) {
    this.key = '';
    this.value = '';
  }
}

export class TextboxQuestion extends QuestionBase {
  controlType = 'textbox';
}

export class DropdownQuestion extends QuestionBase {
  controlType = 'dropdown';
}
