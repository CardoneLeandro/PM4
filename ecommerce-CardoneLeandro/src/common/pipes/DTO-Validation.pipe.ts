import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class DTOValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    //==>> if are workig this createuserDTO
    if (value.confirmPassword && value.password) {
      //==>> check if confirm password and password exist, then check if they match
      if (value.confirmPassword !== value.password) {
        throw new BadRequestException('Passwords do not match'); //==>> if it doesn't match throw error
      }
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => {
          return {
            property: err.property,
            errors: Object.values(err.constraints),
          };
        })
        .map(
          ({ property, errors }) =>
            `Property ${property}: ${errors.join(', ')}`,
        )
        .join('; ');

      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
