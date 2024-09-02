import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { CloudinaryUploadService } from '../files.service';
import { Observable } from 'rxjs';

@Injectable()
export class ImageInterceptor implements NestInterceptor {
  constructor(private readonly imgUploadSv: CloudinaryUploadService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    try {
      if (request.file) {
        // Validar el tamaño de la imagen (no mayor a 200kb)
        if (request.file.size > 200 * 1024) {
          throw new BadRequestException('File size exceeds the limit of 200kb');
        }

        // Validar los tipos de imagen permitidos
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimeTypes.includes(request.file.mimetype)) {
          throw new BadRequestException('Invalid file type');
        }

        // Subir la imagen a Cloudinary si es válida
        const imgUrl = await this.imgUploadSv.uploadFile(request.file);
        request.body.imgUrl = imgUrl; // Asegúrate de usar 'body' en lugar de 'Body'
      } else {
        // Asignar una URL predeterminada si no hay imagen
        request.body.imgUrl = 'https://ibb.co/SrmQYPM'; // Asegúrate de que esta sea una URL directa a una imagen
      }
    } catch (error) {
      throw new BadRequestException('Error during image upload');
    }
    console.log("CARDONE =========>ADDIMAGE INTERCEPTOR OUT", request.body);
    return next.handle();
  }
}

// este interceptor se ocupa de corroborar la exitencia de un archivo en el momento previo al ingreso de la request al controlador.
//en caso de hayarse, el interceptor verifica si cumple con los requisitos de formato y tamaño, de no ser asi lanza un error.
// Si el archivo es valido, el interceptor llama al servicio que se ocupa de subir las imagenes y retorna en el cuerpor de la request la URL de la imagen subida.
// en caso de no hayarse imagenes se le agrega a la request una url por defecto
