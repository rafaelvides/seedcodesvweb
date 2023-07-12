import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'documentoIdentidad', async: false })
export class ValidatorDUI implements ValidatorConstraintInterface {
  validate(value: string, argh: ValidationArguments) {
    // Expresión regular para validar el formato XXXXXXXX-Y
    const regex = /^\d{8}-\d{1}$/;

    return regex.test(value);
  }

  defaultMessage(argh: ValidationArguments) {
    return 'El formato del documento de identidad no es válido. Debe ser XXXXXXXX-Y.';
  }
}
