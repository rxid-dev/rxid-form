export class CheckboxModel {
  private constructor(public option: any, public isChecked: boolean = false) {}
  public static createList(options: Array<any>): Array<CheckboxModel> {
    return options.map((option) => new CheckboxModel(option));
  }

  public static getValues(checkboxs: Array<CheckboxModel>): Array<any> {
    return checkboxs
      .filter((checkbox) => checkbox.isChecked)
      .map((checkbox) => checkbox.option);
  }
}
