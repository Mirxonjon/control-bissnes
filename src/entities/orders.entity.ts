import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { OrderProductsEntity } from './order_products.entity';
import { DebtsEntity } from './debt.entity';
import { CarServiceEntity } from './car_service.entity';

@Entity()
export class OrdersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  total_price: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  daily_price: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  paid_total: string;

  @Column({
    type: 'character varying',
    default: '1',
  })
  IsActive: string;

  @CreateDateColumn()
  data_sequence: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  update_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @ManyToOne(() => UsersEntity, (users) => users.orders)
  @JoinColumn({ name: 'user_id' })
  user_id: UsersEntity;

  @OneToMany(() => OrderProductsEntity, (orderProduct) => orderProduct.order_id)
  orderProducts: OrderProductsEntity[];

  @OneToMany(() => DebtsEntity, (debt) => debt.user_id, {
    nullable: true,
  })
  debt: DebtsEntity[];

  @OneToMany(() => CarServiceEntity, (carService) => carService.user_id)
  carServices: CarServiceEntity[];
}
