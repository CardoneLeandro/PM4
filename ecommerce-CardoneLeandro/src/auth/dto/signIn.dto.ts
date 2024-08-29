import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class SignInDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  eMail: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'Invalid password' },
  )
  Password: string;
}
