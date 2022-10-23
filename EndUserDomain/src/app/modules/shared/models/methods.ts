import { FormGroup } from '@angular/forms';

export function formGroupToModel(model: any, formGroup: FormGroup) {
  Object.assign(model, formGroup.value);
}

export function modelToFormGroup(model: any, formGroup: FormGroup) {
  formGroup.patchValue(model);
}
