import { IOption } from "src/app/modules/shared/models/option";

export class IListSpecificInput {
  label: string;
  value: string;
  style: string;
  headerClass: string;
  link?: string = null;
  linkParam?: string = null;
  enumType?: any = null;
}

export class ISearchEnum {
  value: number;
  label: string;
  options: IOption[];
  valueName: string;
}
