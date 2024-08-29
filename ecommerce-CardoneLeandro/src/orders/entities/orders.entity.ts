import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ type: 'date', nullable: false })
  date: string;

  @OneToOne(() => OrderDetail, { eager: true })
  @JoinColumn()
  orderDetail: OrderDetail;
}
