import { IResponseModel } from "../models/response-model";

export function isInt(value: any): boolean {
  return Number.isInteger(value);
}

export function dealingWithIResponseModel(
  response: IResponseModel,
  onSuccess: (response: IResponseModel) => void,
  onError: (response: IResponseModel) => void
) {
  if (response) {
    if (response.isSuccess) {
      onSuccess(response);
    } else {
      onError(response);
    }
  }
}

export function roundTo(n: number, digits: number) {
  return parseFloat(n.toFixed(digits));
}
