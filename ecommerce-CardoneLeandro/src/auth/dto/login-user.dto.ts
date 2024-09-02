//*     DTO DE INICIO DE SESION


import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsString({ message: 'email must be a string' })
  @IsEmail({}, { message: 'email must be a valid email' })
  email: string;

  @IsNotEmpty({ message: 'password cannot be empty' })
  @IsString({ message: 'password must be a string' })
  @Length(8, 15, { message: 'password must be between 8 and 15 characters' })
  //IsStrongPassword decorator does not have "maxLength" property
  //@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,{message:'password must be a valid password'})
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'password must be contain at least 1 uppercase, 1 lowercase, 1 number and 1 symbol' },
  )
  password: string;
}
