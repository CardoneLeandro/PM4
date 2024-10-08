import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  min,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  @Length(3, 50, { message: 'name must be between 3 and 80 characters' })
  name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsString({ message: 'email must be a string' })
  @IsEmail({}, { message: 'email must be a valid email' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @Length(3, 15, { message: 'password must be between 3 and 15 characters' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'password must be strong' },
  )
  password: string;

  @IsNotEmpty({ message: 'confirmPassword is required' })
  @IsString({ message: 'password must be a string' })
  @Length(3, 15, { message: 'password must be between 3 and 15 characters' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'password must be strong' },
  )
  confirmPassword: string;

  @IsNotEmpty({ message: 'address is required' })
  @IsString({ message: 'address must be a string' })
  @Length(3, 80, { message: 'address must be between 3 and 80 characters' })
  address: string;

  @IsNotEmpty({ message: 'phone is required' })
  @IsNumberString({}, { message: 'phone must be a number' })
  @Length(8, 15, { message: 'phone must be between 3 and 15 characters' })
  phone: number;

  @IsOptional()
  @IsString({ message: 'country must be a string' })
  @Length(5, 20, { message: 'country must be between 5 and 20 characters' })
  country: string;

  @IsOptional()
  @IsString({ message: 'city must be a string' })
  @Length(5, 20, { message: 'city must be between 5 and 20 characters' })
  city: string;
}
