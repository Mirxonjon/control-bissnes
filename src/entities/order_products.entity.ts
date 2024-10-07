import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrdersEntity } from './orders.entity';
import { ProductsEntity } from './products.entity';

@Entity()
export class OrderProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  measurement_sold: string; // metr

  @Column({
    type: 'character varying',
    nullable: true,
  })
  quantity_sold: string; //soni

  @Column({
    type: 'character varying',
  })
  price_per_day: string;

  @Column({
    type: 'character varying',
    default: 'active',
  })
  IsActive: string;

  @Column({
    type: 'character varying',
  })
  unused_days: string;

  @Column({
    type: 'date',
  })
  given_date: Date;

  @Column({
    type: 'date',
  })
  end_date: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  update_date: Date;

  @CreateDateColumn()
  data_sequence: Date;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @ManyToOne(() => OrdersEntity, (order) => order.orderProducts)
  @JoinColumn({ name: 'order_id' })
  order_id: OrdersEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.productItems)
  @JoinColumn({ name: 'product_id' })
  product_id: ProductsEntity;
}
