import { Option } from '../models/option';

export class Enum {
  static getOptionsFromEnum<T>(
    myEnum: T,
    targetedValues: Array<number> = []
  ): any {
    return Object.keys(myEnum as any)
      .map((el) => {
        if (!Number.isInteger(parseInt(el)))
          return {
            value: myEnum[el as keyof T] as any,
            label: el,
          };

        return undefined;
      })
      .filter(function (x) {
        return (
          x !== undefined &&
          (targetedValues.length === 0 || targetedValues.includes(x.value))
        );
      });
  }

  static getOptionByValue = (value: number, options: Option[]): Option =>
    options.find((option) => option.value === value) as any;
}

export enum JobCategory {
  IT = 1,
  HR = 2,
  Accountant = 3,
}
