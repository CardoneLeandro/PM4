import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUUID,
  MaxLength,
  IsOptional,
  IsDecimal,
} from 'class-validator';

export class CreateProductDto {
  @IsUUID('4', { message: 'El ID debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El ID no puede estar vacío.' })
  id: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  description: string;

  @IsDecimal(
    { decimal_digits: '2', force_decimal: true },
    {
      message:
        'El precio debe ser un número decimal con dos dígitos después del punto.',
    },
  )
  @IsNotEmpty({ message: 'El precio no puede estar vacío.' })
  price: number;

  @IsNumber({}, { message: 'El stock debe ser un valor numérico.' })
  @IsNotEmpty({ message: 'El stock no puede estar vacío.' })
  stock: number;

  @IsString({ message: 'La URL de la imagen debe ser una cadena de texto.' })
  @IsOptional()
  imgUrl?: string;

  @IsUUID('4', { message: 'El ID de la categoría debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El ID de la categoría no puede estar vacío.' })
  category_id: string;
}
