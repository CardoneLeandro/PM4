import { DataSource, Repository, ReturningStatementNotSupportedError } from "typeorm";
import { Product } from "../entities/products.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(private dSource: DataSource) {
    super(Product, dSource.createEntityManager());
  }
  
  async addProduct(pData:Partial<Product>):Promise<Product>{
    const newProduct = this.create(pData);
    await this.save(newProduct);
    return newProduct;
  }

  async getProducts(page: number, limit: number):Promise<Product[]>{
    const skip = (page -1) * limit
    return await this.find({skip, take:limit});
  }

 async getProductById(id:string):Promise<Product | null>{
 return await this.findOneBy({id})
 }

 async updateProduct(id:string, data:Partial<Product>):Promise<string | null> {
    await this.update({id}, data);
    return id;
 }
async deleteProduct(id:string):Promise<string | null >{
  await this.delete({id});
  return id
}

}