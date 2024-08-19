import { DataSource, Repository } from "typeorm";
import { Order } from "../entities/orders.entity";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/users.entity";
import { Product } from "src/products/entities/products.entity";
import { OrderDetail } from "src/entities/orderDetails.entity";
@Injectable()
export class OrdersRepository extends Repository<Order> {
    constructor(private readonly dSource: DataSource) {
        super(Order, dSource.getRepository(Order).manager)
    }
async addOrder(uId:string, psId:string[]): Promise<Order |null>{
    const u:User = await this.dSource.getRepository(User).findOneBy({id:uId})
    if(!u) {throw new Error('user not found')}
    const p:Product[] = await this.dSource.getRepository(Product).findByIds(psId)
    if(p.length !== psId.length) {throw new Error('one or more products not found')}
    const Or = new Order()
    Or.user = u
    Or.date = new Date().toISOString()

    const OrDt = new OrderDetail()
    OrDt.price = p.reduce((ttl, pr) => ttl + pr.price, 0)
    OrDt.products = p

    const OrDtS = await this.dSource.getRepository(OrderDetail).save(OrDt)

    Or.orderDetail = OrDtS

    const OrS = await this.save(Or)

    return OrS
}

    async getOrder(id:string): Promise<Order | null> {
        const Ord:Order | null = await this.findOne({where: {id}, relations: ['orderDetail', 'orderDetail.products']}
        )
        if(!Ord) {throw new Error('Order not found')}
        return Ord
    }
}