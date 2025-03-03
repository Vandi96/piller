import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function expiryDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) {
      return null;
    }

    const [month, year] = value.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { expiredCard: true };
    }

    return null;
  }
}