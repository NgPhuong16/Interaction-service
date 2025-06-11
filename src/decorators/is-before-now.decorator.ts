import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import dayjs from 'dayjs';

@ValidatorConstraint({ async: false })
export class IsBeforeNowConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!value) {
      return true;
    }

    const inputDate = dayjs(value);

    if (!inputDate.isValid()) {
      return false;
    }

    // So sánh với thời gian hiện tại
    return inputDate.isAfter(dayjs());
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a date/time before the current time.`;
  }
}

export function IsAfterNow(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsBeforeNowConstraint,
    });
  };
}
