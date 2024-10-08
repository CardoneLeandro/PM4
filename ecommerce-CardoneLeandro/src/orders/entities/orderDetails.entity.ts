import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Order } from 'src/orders/entities/orders.entity';
import { Product } from 'src/products/entities/products.entity';

@Entity({ name: 'order_details' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable({
    name: 'order_detail_products', // Nombre de la tabla intermedia
    joinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];
}
