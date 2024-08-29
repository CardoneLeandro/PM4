import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { UUID } from 'crypto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CloudinaryUploadService {
  constructor(private readonly prodSv: ProductsService) {}

  // Este servicio es llamado el interceptor en la ruta /products para el metodo @Post.
  // Se ocupa de tomar la imagen que llega desde el cliente, subirla y retornar la URL obtenia y inyectarla dentro de la request.
  // De este modo se puede crear el producto en la base de datos con la imagen archivada.
  // En caso de no haber una imagen, el interceptor añade una url predefinida.
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadImage = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      toStream(file.buffer).pipe(uploadImage);
    });
    return result.secure_url;
  }

  // Este servicio es llamado desde su controlador.
  // Habiendo verificado la exitencia del Producto mediante un guardian se procede al llamado del servicio "uploadFile", el cual retornara la URL de la nueva imagen.
  // Con esta nueva URL + el ID del producto se procede al Update del mismo
  async updateProductImage(
    id: UUID,
    file: Express.Multer.File,
  ): Promise<string> {
    const imgUrl = await this.uploadFile(file);
    if (imgUrl) {
      await this.prodSv.updateProduct(id, { imgUrl });
    }
    return imgUrl;
  }
}
