import { IOption } from '../models/option';

export class Enum {
  static getOptionsFromEnum<T>(
    myEnum: T,
    targetedValues: Array<number> = []
  ): IOption[] {
    return Object.keys(myEnum)
      .map((el) => {
        if (!Number.isInteger(parseInt(el)))
          return {
            value: myEnum[el],
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

  static getOptionByValue = (value: number, options: IOption[]): IOption =>
    options.find((option) => option.value === value);
}

export enum JobCategory {
  IT = 1,
  HR = 2,
  Accountant = 3,
}

export enum LogLevel {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
  Primary = 'primary',
}
